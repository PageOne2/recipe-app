import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePicture, getMyRecipes } from "../../redux/redux-saga/sagaActions";
import { profilePicUpdateStatus } from "../../redux/userReducer/userReducer";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RecipeCard from "../../components/recipe-card/recipe.card.component";
import { updateUserPassword } from "../../redux/redux-saga/sagaActions";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./profile.styles.css"

const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const me = useSelector(state => state.user.userData);
  const myRecipes = useSelector(state => state.user.myRecipes);
  const myProfilePicUpdateStatus = useSelector(state => state.user.userProfilePicUpdateStatus);
  const dispatch = useDispatch();
  const myProfilePicApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/user/userProfilePic/${me.photo}`
  : `http://localhost:3000/api/users/userProfilePic/${me.photo}`

  useEffect(() => {
    if (!myRecipes.length) dispatch(getMyRecipes());

    return () => {
      dispatch(profilePicUpdateStatus(''));
    }
  }, [myProfilePicUpdateStatus])

  const handleClick = (index) => {
    if (tabIndex === index) return;
    setTabIndex(index);
  }

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(changeProfilePicture({ file, id: me._id }));
  }

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="user-info">
        <img className="profile-pic" crossOrigin="anonymous" src={myProfilePicApiUrl} alt="profile-picture"></img>
        <div>
          <h3>{me.name}</h3>
          <div className="change-profile-pic-wrapper">
            <label htmlFor="photo">Change Profile Picture</label>
            <input 
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              style={{visibility: "hidden"}}
              onChange={(e) => handleFileSelection(e)}
            />
          </div>
        </div>
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