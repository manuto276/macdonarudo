import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/routes/home/Home';
import { Login } from './components/routes/login/Login';
import { Signup } from './components/routes/signup/Signup';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/user/login' element={ <Login /> } />
          <Route path='/user/signup' element={ <Signup /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;