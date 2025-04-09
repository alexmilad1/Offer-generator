import { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import html2canvas from 'html2canvas';

function App() {
  const [pdfData, setPdfData] = useState(null);

  const generatePDF = async () => {
    // Create first page with the specified image
    const firstPage = document.createElement('div');
    firstPage.style.width = '100%';
    firstPage.style.height = '100vh';
    firstPage.style.display = 'flex';
    firstPage.style.justifyContent = 'center';
    firstPage.style.alignItems = 'center';
    
    const img = new Image();
    img.src = '/Visuals/1.jpeg';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    
    firstPage.appendChild(img);
    document.body.appendChild(firstPage);

    try {
      // Capture the first page
      const firstPageCanvas = await html2canvas(firstPage);
      const firstPageData = firstPageCanvas.toDataURL('image/jpeg');

      // Remove the temporary first page element
      document.body.removeChild(firstPage);

      // Capture the content container
      const contentCanvas = await html2canvas(document.getElementById('content'));
      const contentData = contentCanvas.toDataURL('image/jpeg');

      // Combine pages
      setPdfData([firstPageData, contentData]);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Offer Generator
        </Typography>
        
        <div id="content" style={{ marginBottom: '20px' }}>
          {/* Your existing content goes here */}
          <Typography paragraph>
            Sample content for the second page and onwards...
          </Typography>
        </div>

        <Button variant="contained" onClick={generatePDF}>
          Generate PDF
        </Button>

        {pdfData && (
          <Box sx={{ mt: 2 }}>
            {pdfData.map((pageData, index) => (
              <img 
                key={index}
                src={pageData}
                alt={`Page ${index + 1}`}
                style={{ 
                  width: '100%',
                  marginBottom: '20px',
                  border: '1px solid #ccc'
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;