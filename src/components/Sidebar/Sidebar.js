import React from 'react';
import {Input, InputGroup, InputGroupAddon} from 'reactstrap';

import './sidebar.css';

const inputStyles = {
  // border: 0,
  // color:
  // backgroundColor: 'transparent'
};

function Sidebar({params, setParams, initialParams}){

  const {step, time, maxFileSize} = params;

  const validateParam = (value, name) => {
    if (parseInt(value, 10)) {
      return value
    } else {
      return initialParams[name];
    }
  };

  const onChangeParams = e => {
    const {name, value} = e.target;
    const validatedValue = validateParam(value, name);
    setParams(state => ({
      ...state,
      [name]: validatedValue
    }));
  };

  return <div className='sidebar'>
    <h5 className='font-weight-bold sidebar-title mb-3'>Настройки</h5>
    <InputGroup className='mb-3'>
      <InputGroupAddon addonType='prepend'>Макс. размер</InputGroupAddon>
      <Input addon
             style={inputStyles}
       name='maxFileSize'
       type='number'
       min={10}
       step={10}
       value={maxFileSize}
       onChange={onChangeParams}
      />
      <InputGroupAddon addonType='append'>кБ</InputGroupAddon>
    </InputGroup>
    <InputGroup className='mb-3'>
      <InputGroupAddon addonType='prepend'>
        Прокручивать по
      </InputGroupAddon>
      <Input
       name='step'
       type='number'
       min={1}
       step={1}
       value={step}
       onChange={onChangeParams}
      />
      <InputGroupAddon addonType='append'>px</InputGroupAddon>
    </InputGroup>
    <InputGroup className='mb-4'>
      <InputGroupAddon addonType='prepend'>Каждые</InputGroupAddon>
      <Input
       name='time'
       type='number'
       min={10}
       step={10}
       value={time}
       onChange={onChangeParams}
      />
      <InputGroupAddon addonType='append'>мс</InputGroupAddon>
    </InputGroup>
    <div className='d-flex justify-content-center'>
      <span className='text-muted'>Южный Федеральный Университет, 2019</span>
    </div>
    <div className='d-flex justify-content-center'>
      <span className='text-muted'>makushenko@sfedu.ru</span>
    </div>
  </div>
}

export default Sidebar;
