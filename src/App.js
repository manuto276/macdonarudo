import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/routes/home/Home';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;