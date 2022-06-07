import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/homepage.component';
import RecipePage from './pages/recipe-page/recipe-page.component';
import LoginPage from './pages/login-page/login-page.component';

import { getMe } from './redux/redux-saga/sagaActions';
import Cookies from 'js-cookie';

import './App.css';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt && !isLoggedIn) dispatch(getMe());
  }, [dispatch])
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}>
        </Route>
        <Route path='/recipe/:recipeId' element={<RecipePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
