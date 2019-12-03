import React from 'react';
import {Document, Page} from 'react-pdf';
import _ from 'lodash';
import {Button} from 'reactstrap';

const range = n => {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
};


const PDFView = ({files, onFileLoaded, pages, setPages, finishProcess}) => {
  const onDocumentLoadSuccess = ({numPages}, fileKey) => {
    setPages({...pages, [fileKey]: numPages});
    onFileLoaded(fileKey);
  };

  return <div className='view-area' hidden={!files.length}>
    <div className='d-flex justify-content-center'>
      <div className='d-flex flex-column'>
        {files ? _.map(files, file => {

          const pageRange = pages[file.key] ? range((pages[file.key])) : [];

          return <div key={file.key} className='pb-5'>
            <Document
              size='A4'
              file={file.base64}
              renderMode='svg'
              onLoadSuccess={props => onDocumentLoadSuccess(props, file.key)}
            >
              {_.map(pageRange, page =>
                <Page
                  key={_.uniqueId('page_')}
                  width={1080}
                  pageNumber={page}
                />
              )}
            </Document>
          </div>;
        }) : null}
      </div>
    </div>
    <div className='d-flex justify-content-center'>
      <span>
      <a
        className='text-muted'
        style={{width: '30px', cursor: 'pointer'}}
        onClick={finishProcess}
      >
        Go to top
      </a>
      </span>
    </div>
  </div>;
};


export default PDFView;
