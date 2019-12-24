import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Row, Col} from 'reactstrap';
import {MdAirplay} from 'react-icons/md';
import {pdfjs} from 'react-pdf';
import _ from 'lodash';

import Sidebar from '../components/Sidebar/Sidebar'
import PDFView from '../components/PDFView/PDFView';
import FileInput from '../components/FileInput/FileInput';
import {useWindowEvent} from '../hooks';
import {getFileExt} from '../utils';
import '../styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function PlayButton({files, initialScroll}) {
  const disabled = !_.every(files, file => file.loaded);

  if (files.length > 0) {
    return <span>
      <a
        disabled={disabled}
        style={{width: '250px', cursor: 'pointer', fontSize: 34}}
        onClick={initialScroll}
        className='d-flex align-items-center'
      >
        <span className='mr-4' style={{fontSize: '70px', color: '#383E45'}}>Play</span>
        <MdAirplay color='#383E45' size={70}/>
      </a>
    </span>
  }
  return <></>;
}

const initialParams = {
  step: 50,    // px
  time: 10,    // ms
  maxFileSize: 1500,   // kb
};


function openFullscreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function App(props) {
  const [files, setFiles] = useState([]);
  const [params, setParams] = useState(initialParams);
  const [pages, setPages] = useState({});
  const [scrollIntervalId, setScrollIntervalId] = useState(null);

  const processScroll = useCallback(() => {
    const intervalId = setInterval(() => {
      window.scrollBy(0, params.step)
    }, params.time);
    setScrollIntervalId(intervalId);
  }, [scrollIntervalId]);

  const endProcessScroll = useCallback(() => {
    clearInterval(scrollIntervalId);
    setScrollIntervalId(null);
  }, [scrollIntervalId]);

  const toggleScroll = useCallback(() => {
    if (scrollIntervalId) {
      endProcessScroll();
    } else {
      processScroll();
    }
  }, [scrollIntervalId]);

  useWindowEvent('keypress', e => {
    if (scrollIntervalId) e.preventDefault();

    if (e.keyCode === 32 && files.length) {
      e.preventDefault();
      toggleScroll();
    }
  });

  const initialScroll = (e) => {
    openFullscreen();
    setTimeout(() => {window.scrollTo(0, window.innerHeight)}, 1000);
  };

  const finishProcess = () => {
    endProcessScroll();
    window.scrollTo(0,0);
  };

  const uploadFiles = files => {
    const newFiles = _.map(files, file => ({
      key: _.uniqueId('file_'),
      name: file.name,
      base64: file.base64,
      loaded: _.includes(['jpg', 'jpeg', 'png'], getFileExt(file.name))
    }));

    setFiles(files => [
      ...files, ...newFiles
    ]);
  };

  const removeFile = key => {
    setFiles([
      ..._.filter(files, file => file.key !== key)
    ]);
  };

  const onFileLoaded = key => {
    setFiles([
      ..._.map(files, file => {
        if (file.key === key) {
          return {...file, loaded: true};
        }
        return {...file};
      })
    ])
  };

  return <div className='main'>
    <div className='container pt-5 main'>
      {/* TODO: ADD HEADER*/}
      <Row>
        <Col md={1}/>
        <Col md={5}>
          <Sidebar params={params} setParams={setParams} initialParams={initialParams}/>
        </Col>
        <Col md={5}>
          <div className='work-area'>
            <FileInput
              files={files}
              uploadFiles={uploadFiles}
              removeFile={removeFile}
              maxSize={params.maxFileSize * 1000}
            />
          </div>
        </Col>
      </Row>
      <Row style={{paddingTop: '100px'}}>
        <Col md={12}>
          <div className='d-flex justify-content-center'>
            <PlayButton files={files} initialScroll={initialScroll}/>
          </div>
        </Col>
      </Row>
    </div>
    <div className='view-container'>
      <PDFView
        files={files}
        pages={pages}
        setPages={setPages}
        onFileLoaded={onFileLoaded}
        finishProcess={finishProcess}
      />
    </div>
  </div>;
}


export default App;
