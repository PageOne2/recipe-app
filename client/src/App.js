import { Routes, Route } from 'react-router-dom'

import Header from './components/header/header.component'
import HomePage from './pages/home-page/homepage.component'

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
