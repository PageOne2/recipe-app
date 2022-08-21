import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUser } from '../../redux/redux-saga/sagaActions';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './login-page.styles.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  useEffect(() => {
    if (isLoggedIn) { 
      navigate('/');
    }
  }, [isLoggedIn]);
  
  return (
    <div className='login-page'>
      <ToastContainer />
      <div className='form'>
        <div className="form-title">
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
            <ErrorMessage name='email' render={msg => <div className='error-msg'>{msg}</div>} />
            <Field className='form-input' name='email' type='email' placeholder="Email"/>

            <ErrorMessage name='password' render={msg => <div className='error-msg'>{msg}</div>} />
            <Field className='form-input' name='password' type='password' placeholder="Password"/>

            <div className='btn-message'>
              <p className='message'>You don't have a account yet? <a>Sign Up</a></p>
            </div>
            <button className='submit-btn' type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage;