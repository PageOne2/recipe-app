import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createRecipe } from "../../redux/redux-saga/sagaActions";

import "./share-recipe-page.styles.css";

const ShareRecipePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="share-recipe-container">
      <div className="form">
        <div className="form-title">
          <h2>Share your recipe</h2>
        </div>
        <Formik
          initialValues={{
            recipeName: '',
            ingredients: [],
            method: [],
            preparationTime: 0
          }}
          validationSchema={Yup.object({
            recipeName: Yup.string().required('A recipe must have a name'),
            ingredients: Yup.array().of(Yup.string()).min(1, 'A recipe must have at least one ingredient').required('Required'),
            method: Yup.array().of(Yup.string()).min(1, 'A recipe must have at least one preparation method').required('Required'),
            preparationTime: Yup.number().min(1, 'Add a valid time').required('Required')
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(createRecipe(values));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="recipeName">Your recipe name</label>
            <ErrorMessage name="recipeName" render={msg => <div className="error-msg">{msg}</div>}/>
            <Field className="form-input" name="recipeName" type="text"/>

            <label htmlFor="ingredients">Add your recipe ingredients</label>
            <ErrorMessage name="ingredients" render={msg => <div className="error-msg">{msg}</div>}/>
            <Field className="form-input" name="ingredients" type="text"/>

            <label htmlFor="method">Add preparation methods</label>
            <ErrorMessage name="method" render={msg => <div className="error-msg">{msg}</div>}/>
            <Field className="form-input" name="method" type="text"/>

            <label htmlFor="preparationTime">Preparation time in minutes</label>
            <ErrorMessage name="preparationTime" render={msg => <div className="error-msg">{msg}</div>}/>
            <Field className="form-input" name="preparationTime" type="number"/>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ShareRecipePage;