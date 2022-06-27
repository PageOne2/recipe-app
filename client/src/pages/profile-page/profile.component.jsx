import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipes } from "../../redux/redux-saga/sagaActions";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import profilePic from "../../assets/user-profile.png";
import RecipeCard from "../../components/recipe-card/recipe.card.component";
import { updateUserPassword } from "../../redux/redux-saga/sagaActions";

import "./profile.styles.css"

const ProfilePage = () => {
  const me = useSelector((state) => state.user.userData);
  const myRecipes = useSelector((state) => state.user.myRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [])

  return (
    <div className="profile-container">
      <div className="user-info">
        <img className="profile-pic" src={profilePic} alt="profile-picture"></img>
        <h3>{me.name}</h3>
      </div>
      <div className="my-recipes">
        {myRecipes.map(item => (
          <RecipeCard key={uuidv4()} item={item}/>
        ))}
      </div>
      <div className="update-password">
        <Formik
          initialValues={{currentPassword: '', password: '', passwordConfirm: ''}}
          validationSchema={Yup.object({
            currentPassword: Yup.string().min(8).required('Please enter your current password'),
            password: Yup.string().min(8).required('Please enter your new password'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Your password are not the same').required('Please confirm your password')
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(updateUserPassword(values));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label className="for-label" htmlFor="currentPassword">Current Password</label>
            <ErrorMessage name="currentPassword" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="currentPassword" type="password" />

            <label className="for-label" htmlFor="password">New Password</label>
            <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="password" type="password" />

            <label className="for-label" htmlFor="passwordConfirm">Confirm Your Password</label>
            <ErrorMessage name="passwordConfirm" render={msg => <div className="error-msg">{msg}</div>} />
            <Field className="form-input" name="passwordConfirm" type="password" />

            <div className='btn-message'>
              <button className='submit-btn' type='submit'>Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ProfilePage;