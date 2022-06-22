import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/routes/home/Home';
import { Login, Signup } from './components/routes/logging/Logging';
import { Menu } from './components/routes/menu/Menu';
import axios from 'axios';

const AuthContext = createContext();

function App() {

  const checkAuthentication = () => {
        const host = process.env.REACT_APP_API_HOST
        axios.get(`http://${host}/api/user/authenticated`,{
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
            <Route path='/'>
              <Route path='/' element={ <Home /> } />
              <Route path='/menu' element={ <Menu /> } />
            </Route>
            <Route path='user/login' element={ <Login /> } />
            <Route path='user/signup' element={ <Signup /> } />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}
export { App, AuthContext };