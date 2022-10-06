import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUser } from '../../redux/redux-saga/sagaActions';
import { ToastContainer } from "react-toastify";
import { 
  Wrapper,
  FormWrapper,
  FormTitle,
  InputErrorMessage,
  FormMessage,
  Message,
  SubmitButton
} from '../../components/styled-components/form-styles/styled-components';

import "react-toastify/dist/ReactToastify.css";

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
    <Wrapper>
      <ToastContainer />
      <FormWrapper>
        <FormTitle>
          <h2>Login</h2>
        </FormTitle>
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
            <ErrorMessage name='email' render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className='form-input' name='email' type='email' placeholder="Email"/>

            <ErrorMessage name='password' render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className='form-input' name='password' type='password' placeholder="Password"/>

            <FormMessage>
              <Message>You don't have a account yet? <a>Sign Up</a></Message>
            </FormMessage>
            <SubmitButton type='submit'>Submit</SubmitButton>
          </Form>
        </Formik>
      </FormWrapper>
    </Wrapper>
  )
}

export default LoginPage;