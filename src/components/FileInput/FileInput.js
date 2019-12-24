import React from 'react';
import FileBase64 from '../FileBase64';

import './fileinput.css';
import UploadedFiles from '../UploadedFiles';

export default function FileInput(props) {
  const {uploadFiles, files, removeFile, maxSize=Infinity} = props;

  const fileInput = React.createRef();

  const getFiles = files => {
    uploadFiles(files);
  };

  const fileInputText = files.length ? 'Добавить файлы' : 'Выбрать файлы';

  const checkFileSize = file => {
    if (file.size > maxSize) {
      alert(`Файл ${file.name} слишком большой.\nМаксимальный размер ${maxSize}kb.`);
      return false;
    }
    return true;
  };

  return <div className='d-flex flex-column justify-space-between'>
    <div className='pt-2'>
      <div className='d-flex flex-row justify-content-center'>
        <a
          onClick={() => {fileInput.current.click()}}
          style={{cursor: 'pointer'}}
        >
          {fileInputText}
        </a>
      </div>
      <UploadedFiles files={files} removeFile={removeFile} />
    </div>
    <div hidden>
      <FileBase64
        ref={fileInput}
        multiple={true}
        onDone={getFiles.bind(this)}
        checkSize={checkFileSize}
      />
    </div>
  </div>;
}