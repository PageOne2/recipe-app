import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/homepage.component';
import RecipePage from './pages/recipe-page/recipe-page.component';
import LoginPage from './pages/login-page/login-page.component';

import './App.css';

function App() {
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
