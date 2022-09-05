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
import { 
  ProfileWrapper,
  UserInfo,
  ProfilePic,
  ChageProfilePicWrapper,
  ChangeProfilePicInputWrapper,
  TabWrapper,
  Tab,
  RecipesWrapper,
  UpdatePassWordFormWrapper
} from "../../components/styled-components/profile-page/styled-components";
import { 
  FormWrapper,
  FormTitle,
  InputErrorMessage,
  SubmitButton, 
} from "../../components/styled-components/form-styles/styled-components";

import "react-toastify/dist/ReactToastify.css";

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
    <ProfileWrapper>
      <ToastContainer />
      <UserInfo>
        <ProfilePic crossOrigin="anonymous" src={myProfilePicApiUrl} alt="profile-picture"/>
        <ChageProfilePicWrapper>
          <h3>{me.name}</h3>
          <ChangeProfilePicInputWrapper>
            <label htmlFor="photo">Change Profile Picture</label>
            <input 
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelection(e)}
            />
          </ChangeProfilePicInputWrapper>
        </ChageProfilePicWrapper>
      </UserInfo>
      <TabWrapper>
        <Tab op={tabIndex !== 0 ? "0.6" : "1"} onClick={() => handleClick(0)}>My Recipes</Tab>
        <Tab op={tabIndex !== 1 ? "0.6" : "1"} onClick={() => handleClick(1)}>Update Password</Tab>
      </TabWrapper>
      {tabIndex === 0 &&
        <RecipesWrapper>
        {myRecipes.map(item => (
          <RecipeCard key={uuidv4()} item={item}/>
        ))}
      </RecipesWrapper>
      }
      {tabIndex === 1 &&
      <UpdatePassWordFormWrapper>
        <FormWrapper>
          <FormTitle>
            <h2>Update Password</h2>
          </FormTitle>
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
              <ErrorMessage name="currentPassword" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
              <Field className="form-input" name="currentPassword" type="password" placeholder="Current Password"/>

              <ErrorMessage name="password" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
              <Field className="form-input" name="password" type="password" placeholder="New Password"/>

              <ErrorMessage name="passwordConfirm" render={msg => <InputErrorMessage>{msg}</InputErrorMessage>} />
              <Field className="form-input" name="passwordConfirm" type="password" placeholder="Confirm Your Password"/>

              <SubmitButton type='submit'>Submit</SubmitButton>
            </Form>
          </Formik>
        </FormWrapper>
      </UpdatePassWordFormWrapper>
      }
    </ProfileWrapper>
  )
}

export default ProfilePage;