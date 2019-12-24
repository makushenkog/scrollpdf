import React, {useState} from 'react';
import {MdClear} from 'react-icons/md';
import _ from 'lodash';

function Loading(props){
  const {loaded} = props;

  switch (loaded) {
    case true:
      return <>Загружен</>;
    default:
      return <>Не загружен</>;
  }
}

const filenameStyle = {
  maxWidth: '250px',
  fontWeight: '400',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export default function UploadedFiles(props) {
  const {files, removeFile} = props;

  return <div className='filelist'>
    {_.map(files, file  => <div
      key={file.key}
      title={file.name}
      className='d-flex justify-content-between w-100'
    >
      <span className='d-flex align-items-center'>
        <MdClear
          className='mr-2'
          onClick={() => removeFile(file.key)}
          size={14}
          style={{cursor: 'pointer'}}
          color='red'
        />
        <span
          className='filename'
          title={file.name}
        >
          {file.name}
        </span>
      </span>
      <span className='fs-14 font-weight-light'>
        <Loading loaded={file.loaded}/>
      </span>
    </div>
    )}
  </div>;
}