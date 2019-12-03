/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React, {useState} from 'react';

const FileBase64 = React.forwardRef((props, ref) => {
  const {onDone, multiple, checkSize, ...rest} = props;

  const [state, setState] = useState([]);

  const handleChange = e => {

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        if (checkSize) {
          if (!checkSize(file)) return;
        }

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length == files.length){
          // Apply Callback function
          if(multiple) onDone(allFiles);
          else onDone(allFiles[0]);
        }

      } // reader.onload

    } // for

  }

    return (
      <input
        type="file"
        onChange={handleChange.bind(this) }
        multiple={multiple}
        ref={ref}
      />
    );

});

FileBase64.defaultProps = {
  multiple: false,
};


export default FileBase64;