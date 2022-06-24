import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUser } from '../../redux/redux-saga/sagaActions';
import { logInUserFailure } from '../../redux/userReducer/userReducer';
import ErrorModal from '../../components/error-modal/error.modal.component';

import './login-page.styles.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const logInErrorMessage = useSelector((state) => state.user.logInErrorMessage);
  const [failedLog, setFailedLog] = useState({fail: false, errMessage: ''});
  
  useEffect(() => {
    if (isLoggedIn) { 
      navigate('/');
    } else if (logInErrorMessage) {
      setFailedLog({fail: true, errMessage: logInErrorMessage});
    } else {
      setFailedLog({fail: false, errMessage: ''});
    }
  }, [isLoggedIn, logInErrorMessage]);
  
  useEffect(() => {
    return () => {      
      dispatch(logInUserFailure(''));
    }
  }, []);

  return (
    <div className='login-page'>
      <ErrorModal showModal={failedLog.fail} errMessage={failedLog.errMessage} logInPage={true}/>
      <div className='form'>
        <div className="title">
          <h2>Login</h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string()
              .min(8)
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(logUser(values));            
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label className='form-label' htmlFor='email'>Email</label>
            <ErrorMessage name='email' render={msg => <div className='error-msg'>{msg}</div>} />
            <Field className='form-input' name='email' type='email' />

            <label className='form-label' htmlFor='password'>Password</label>
            <ErrorMessage name='password' render={msg => <div className='error-msg'>{msg}</div>} />
            <Field className='form-input' name='password' type='password' />

            <div className='btn-message'>
              <button className='submit-btn' type='submit'>Submit</button>
              <p className='message'>You don't have a account yet? <a>Sign Up</a></p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage;