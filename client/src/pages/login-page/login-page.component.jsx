import React, { useEffect } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logUser } from '../../redux/redux-saga/sagaActions';
import { redirection } from '../../redux/userReducer/userReducer';

import './login-page.styles.css';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) { 
      dispatch(redirection(true));
      navigate('/');
    }
  }, [])

  return (
    <div className='login-page'>
      <div className='form'>
        <div className="title">
          <h2>Login</h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
              .min(8)
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(logUser(values));            
            setTimeout(() => {
              setSubmitting(false);
              navigate('/')
            }, 1000)
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