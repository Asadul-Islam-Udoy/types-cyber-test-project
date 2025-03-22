import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import HostUrls from '../../../host/HostUrls';
import { useParams } from 'react-router-dom';

function ContractPdf() {
  const { pdfs } = useParams<{ pdfs: string }>(); // Type `pdfs` as string
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  // Set the worker source for pdf.js
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  useEffect(() => {
    // Set the URL to the static file served by Node.js
    setPdfUrl(`${HostUrls}/public/files/${pdfs}`);
  }, []);
  useEffect(() => {
    // Fetch the PDF
    const fetchPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${HostUrls}/public/files/${pdfs}`);

        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
        console.log(response)
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfFile(url);
      } catch (err) {
        setError('Error loading PDF');
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [pdfs]); // Dependency array ensures refetching when `pdfs` changes

  // Handle the number of pages in the PDF
  const onLoadSuccess = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
  };

  return (
    <div>
      {loading && <p>Loading PDF...</p>} {/* Show loading state */}
      {error && <p>{error}</p>} {/* Show error if there is one */}
      {/* {pdfFile && !loading && !error ? (
        <Document file={pdfFile} onLoadSuccess={onLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      ) : null} */}
       <div>
      {pdfUrl ? (
        <iframe src={pdfUrl} width="600" height="800" title="PDF Viewer" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}

export default ContractPdf;
