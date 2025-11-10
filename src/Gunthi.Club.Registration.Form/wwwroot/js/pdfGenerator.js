window.generatePDF = () => {
    // Get the full pdf page (header + content + footer)
    const content = document.querySelector('.pdf-page');

    if (!content) {
        console.error('No element with class .pdf-page found');
        return;
    }

    // Store original styles
    const originalStyle = content.style.cssText;
    const originalBodyBg = document.body.style.backgroundColor;

    // Apply print-friendly styles to the container
    content.style.padding = '10px';
    content.style.boxShadow = 'none';
    content.style.maxWidth = 'none';
    content.style.background = '#fff';
    content.style.borderRadius = '0';
    // Ensure body has white background to avoid bleeding transparent areas
    document.body.style.backgroundColor = '#ffffff';

    // Use html2canvas to capture the content
    // Use devicePixelRatio to get a sharper image when available
    const captureScale = Math.min(2, window.devicePixelRatio || 1);

    html2canvas(content, {
        scale: captureScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
    }).then(canvas => {
        try {
            // Convert canvas to PDF using jsPDF and fit to single A4 page
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const margin = 10; // margin in mm

            const imgData = canvas.toDataURL('image/png');

            // Canvas size in pixels
            const imgWidthPx = canvas.width;
            const imgHeightPx = canvas.height;

            // Convert pixels to mm (approximate using 96 DPI)
            const pxToMm = px => px * 25.4 / 96;
            let imgWidthMm = pxToMm(imgWidthPx);
            let imgHeightMm = pxToMm(imgHeightPx);

            // Calculate max printable area
            const maxWidth = pageWidth - 2 * margin;
            const maxHeight = pageHeight - 2 * margin;

            // Determine scale to fit image into a single page while preserving aspect ratio
            const widthScale = maxWidth / imgWidthMm;
            const heightScale = maxHeight / imgHeightMm;
            const scale = Math.min(widthScale, heightScale, 1);

            const finalWidth = imgWidthMm * scale;
            const finalHeight = imgHeightMm * scale;

            // Center the image on the page
            const x = (pageWidth - finalWidth) / 2;
            const y = margin + ((maxHeight - finalHeight) / 2);

            // Fill PDF background with white to avoid any transparent/colored areas
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            // Add the image to the PDF (single page)
            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

            // Save the PDF
            pdf.save('ficha-inscricao.pdf');
        } finally {
            // Restore original styles even on success
            content.style.cssText = originalStyle;
            document.body.style.backgroundColor = originalBodyBg;
        }
    }).catch(err => {
        console.error('Error generating PDF', err);
        // Restore original styles even on error
        content.style.cssText = originalStyle;
        document.body.style.backgroundColor = originalBodyBg;
    });
};