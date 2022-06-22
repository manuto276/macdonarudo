import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/routes/home/Home';
import { Login, Signup } from './components/routes/logging/Logging';
import axios from 'axios';

const AuthContext = createContext();

function App() {

  const checkAuthentication = () => {
        axios.get('http://localhost:3001/api/user/authenticated',{
            withCredentials: true, 
        }).then(
            (response) => {
                if(response.status === 200){
                    setIsUserLogged(true);
                }
            }
        ).catch((reason) => console.log(reason));
  }

  // check if the user is authenticated at first rendering
  useEffect(checkAuthentication, []);
  
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <div className='App'>
      <AuthContext.Provider value={{isUserLogged, setIsUserLogged}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/user/login' element={ <Login /> } />
            <Route path='/user/signup' element={ <Signup /> } />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}
export { App, AuthContext };