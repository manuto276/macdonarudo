import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './components/pages/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Main />} />
          <Route path='login' element={<div />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;