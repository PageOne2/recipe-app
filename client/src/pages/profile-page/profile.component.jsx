import { useEffect, useState } from "react";
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
  const [tabIndex, setTabIndex] = useState(0);
  const me = useSelector(state => state.user.userData);
  const myRecipes = useSelector(state => state.user.myRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [])

  const handleClick = (index) => {
    if (tabIndex === index) return;
    setTabIndex(index);
  }

  return (
    <div className="profile-container">
      <div className="user-info">
        <img className="profile-pic" src={profilePic} alt="profile-picture"></img>
        <h3>{me.name}</h3>
      </div>
      <div className="tab-titles">
        <span className={tabIndex !== 0 ? 'inactive' : ''} onClick={() => handleClick(0)}>My Recipes</span>
        <span className={tabIndex !== 1 ? 'inactive' : ''} onClick={() => handleClick(1)}>Update Password</span>
      </div>
      {tabIndex === 0 &&
        <div className="my-recipes">
        {myRecipes.map(item => (
          <RecipeCard key={uuidv4()} item={item}/>
        ))}
      </div>
      }
      {tabIndex === 1 &&
      <div className="update-password">
        <div className="form">
          <div className="form-title">
            <h2>Update Password</h2>
          </div>
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
              <ErrorMessage name="currentPassword" render={msg => <div className="error-msg">{msg}</div>} />
              <Field className="form-input" name="currentPassword" type="password" placeholder="Current Password"/>

              <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />
              <Field className="form-input" name="password" type="password" placeholder="New Password"/>

              <ErrorMessage name="passwordConfirm" render={msg => <div className="error-msg">{msg}</div>} />
              <Field className="form-input" name="passwordConfirm" type="password" placeholder="Confirm Your Password"/>

              <button className='submit-btn' type='submit'>Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
      }
    </div>
  )
}

export default ProfilePage;