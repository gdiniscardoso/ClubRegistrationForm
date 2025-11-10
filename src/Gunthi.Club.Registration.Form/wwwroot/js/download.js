window.downloadFile = (fileName, contentType, content) => {
    const file = new File([content], fileName, { type: contentType });
    const link = document.createElement('a');
  const url = URL.createObjectURL(file);
    
    link.href = url;
    link.download = fileName;
 document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};