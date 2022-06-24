import { useDispatch } from 'react-redux';
import { logInUserFailure, signUpUserFailure } from '../../redux/userReducer/userReducer';

import './error.modal.styles.css';

const ErrorModal = ({ showModal, errMessage, logInPage, signUpPage }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (logInPage) dispatch(logInUserFailure(''));
    if (signUpPage) dispatch(signUpUserFailure(''));
  }

  return (
    <>
    { showModal ?
      <div className='err-msg'>
        <h3>{errMessage}</h3>
        <button className='close-err-msg' onClick={() => handleClick()}>X</button>
      </div> 
    : null }
    </>
  )
}

export default ErrorModal;