import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/redux-saga/sagaActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { signUpUserFailure } from "../../redux/userReducer/userReducer";
import ErrorModal from "../../components/error-modal/error.modal.component";

import "./signup.styles.css";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const signUpErrorMessage = useSelector(state => state.user.signUpErrorMessage);
  const [failedLog, setFailedLog] = useState({ fail: false, errMessage: '' });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else if (signUpErrorMessage) {
      setFailedLog({ fail: true, errMessage: signUpErrorMessage });
    } else {
      setFailedLog({ fail: false, errMessage: '' })
    }
  }, [isLoggedIn, signUpErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(signUpUserFailure(''));
    }
  }, []);

  return (
    <div className="signup-page">
      <ErrorModal showModal={failedLog.fail} errMessage={failedLog.errMessage} signUpPage={true}/>
      <div className="form">
        <div className="form-title">
          <h2>Sign Up</h2>
        </div>
        <Formik
          initialValues={{ name: '', email: '', password: '', passwordConfirm: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Please enter your name'),
            email: Yup.string().email('Invalid email format').required('Please enter your email'),
            password: Yup.string().min(8).required('Please enter your password'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Your passwords are not the same').required('Please confirm your password')
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(signUp(values));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <ErrorMessage name="name" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="name" type="text" placeholder="Name"/>

            <ErrorMessage name="email" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="email" type="email" placeholder="Email"/>

            <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="password" type="password" placeholder="Password"/>

            <ErrorMessage name="passwordConfirm" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="passwordConfirm" type="password" placeholder="Confirm Password"/>

            <div className='btn-message'>
              <p className='message'>Already have an account ? <a>Log In</a></p>
            </div>
            <button className='submit-btn' type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignUpPage;