import React from 'react';
import {Document, Page} from 'react-pdf';
import _ from 'lodash';

import {getFileExt} from '../../utils';

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
          const ext = getFileExt(file.name);

          const pageRange = pages[file.key] ? range((pages[file.key])) : [];

          switch (ext) {
            case 'pdf':
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
            case 'jpg':
              return <div key={file.key} className='pb-5 d-flex justify-content-center'>
                <img src={file.base64} />
              </div>;
            case 'jpeg':
              return <div key={file.key} className='pb-5 d-flex justify-content-center'>
                <img src={file.base64} />
              </div>;
            case 'png':
              return <div key={file.key} className='pb-5 d-flex justify-content-center'>
                <img src={file.base64} />
              </div>;
            default:
              return <></>
          }

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
        Наверх
      </a>
      </span>
    </div>
  </div>;
};


export default PDFView;
