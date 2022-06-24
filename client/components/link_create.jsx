import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';

const LinkCreate = () => {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  function clearIfCorrect() {
    setErrorMessage('');
    // @ts-ignore
    if (inputRef.current?.value) inputRef.current.value = '';
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    // @ts-ignore
    const link = inputRef.current?.value;
    if (link)
      Meteor.call('links.insert', link, (err) =>
        err ? setErrorMessage('Enter a valid URL') : clearIfCorrect()
      );
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <div className='form-group'>
        <label>Link to shorten</label>
        <input ref={inputRef} className='form-control' />
      </div>
      <div className='text-danger'>{errorMessage}</div>
      <button className='btn btn-primary'>Shorten!</button>
    </form>
  );
};

export default LinkCreate;
