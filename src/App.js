import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/routes/home/Home';
import { Login, Signup } from './components/routes/logging/Logging';

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