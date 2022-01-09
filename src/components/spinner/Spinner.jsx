import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/icon-spinner.svg';
import './Spinner.scss';

const Spinner = ({ width, height, borderWidth }) => {
  return (
    <div className='loading-box'>
      <div
        className='loader'
        style={{ width: width, height: height, borderWidth: borderWidth }}
      >
        {/* <SpinnerIcon /> */}
      </div>
      <div className='text'>Loading ...</div>
    </div>
  );
};

export default Spinner;
