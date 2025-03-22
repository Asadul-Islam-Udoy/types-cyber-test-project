import React from 'react';
import HostUrls from '../../../host/HostUrls';
import { useParams } from 'react-router-dom';

function ContractPdf() {
  const { pdfs } = useParams<{ pdfs: string }>(); // Type `pdfs` as string
  return (
    <div> {/* Show error if there is one */}
       <div>
      {pdfs ? (
        <iframe src={`${HostUrls}/images/files/${pdfs}`} width="600" height="800" title="PDF Viewer" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}

export default ContractPdf;
