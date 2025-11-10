window.generatePDF = () => {
    // Get the form container
    const content = document.querySelector('.form-container');
    
    // Store original styles
    const originalStyle = content.style.cssText;
    
    // Apply print-friendly styles
    content.style.padding = '20px';
    content.style.boxShadow = 'none';
    content.style.maxWidth = 'none';
    
    // Use html2canvas to capture the content
    html2canvas(content, {
        scale: 2,
    useCORS: true,
        allowTaint: true
    }).then(canvas => {
        // Convert canvas to PDF using jsPDF
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
    
        // Add image to first page
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
     // Add new pages if content overflows
        while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
      pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        }
        
 // Save the PDF
        pdf.save('ficha-inscricao.pdf');
     
        // Restore original styles
        content.style.cssText = originalStyle;
    });
};