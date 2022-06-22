import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/routes/home/Home';
import { Login, Signup } from './components/routes/logging/Logging';
import { Menu } from './components/routes/menu/Menu';

function App() {
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='/' element={ <Home /> } />
            <Route path='/menu' element={ <Menu /> } />
          </Route>
          <Route path='user/login' element={ <Login /> } />
          <Route path='user/signup' element={ <Signup /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;