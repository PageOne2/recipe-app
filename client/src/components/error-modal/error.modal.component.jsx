import './error.modal.styles.css';

const ErrorModal = ({ showModal, errMessage }) => {
  return (
    <>
    { showModal ?
      <div className='err-msg'>
        <h3>{errMessage}</h3>
        <button className='close-err-msg'>X</button>
      </div> 
    : null }
    </>
  )
}

export default ErrorModal;