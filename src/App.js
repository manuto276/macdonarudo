import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/routes/home/Home';
import { Login } from './components/routes/login/Login';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;