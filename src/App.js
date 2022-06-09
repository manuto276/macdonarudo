import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './components/pages/Main';
import { Login } from './components/pages/login/Login';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;