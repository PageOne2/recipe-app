import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/redux-saga/sagaActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <ToastContainer />
      <FormWrapper>
        <FormTitle>
          <h2>Sign Up</h2>
        </FormTitle>
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
            <ErrorMessage name="name" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className="form-input" name="name" type="text" placeholder="Name"/>

            <ErrorMessage name="email" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className="form-input" name="email" type="email" placeholder="Email"/>

            <ErrorMessage name="password" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className="form-input" name="password" type="password" placeholder="Password"/>

            <ErrorMessage name="passwordConfirm" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
            <Field className="form-input" name="passwordConfirm" type="password" placeholder="Confirm Password"/>

            <FormMessage>
              <Message>Already have an account ? <a>Log In</a></Message>
            </FormMessage>
            <SubmitButton type='submit'>Submit</SubmitButton>
          </Form>
        </Formik>
      </FormWrapper>
    </Wrapper>
  )
}

export default SignUpPage;