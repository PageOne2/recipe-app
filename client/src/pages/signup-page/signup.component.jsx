import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/redux-saga/sagaActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="signup-page">
      <div className="form">
        <div className="title">
          <h1>Sign Up</h1>
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
            <label className="for-label" htmlFor="name">Name</label>
            <ErrorMessage name="name" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="name" type="text" />

            <label className="for-label" htmlFor="email">Email</label>
            <ErrorMessage name="email" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="email" type="email" />

            <label className="for-label" htmlFor="password">Password</label>
            <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="password" type="password" />

            <label className="for-label" htmlFor="passwordConfirm">Confirm Password</label>
            <ErrorMessage name="passwordConfirm" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="passwordConfirm" type="password" />

            <div className='btn-message'>
              <button className='submit-btn' type='submit'>Submit</button>
              <p className='message'>Already have an account ? <a>Log In</a></p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignUpPage;