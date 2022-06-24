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

  // check the user authentication by sending a get to
  // /api/user/authenticated. If the client has an access_token cookie,
  // this request will verify if it's valid. If it is, the user is authenticated with.
  // Otherwise they will receive a 401 status response.
  const checkAuthentication = () => {
        const host = process.env.REACT_APP_API_HOST
        axios.get(`http://${host}/api/users/authenticated`,{
            withCredentials: true, 
        }).then(
            (response) => {
                if(response.status === 200){
                    setIsUserLogged(true);
                    setRole(response.data.role);
                }
            }
        ).catch((reason) => console.log(reason));
  }

  // check if the user is authenticated at first rendering
  useEffect(checkAuthentication, []);
  
  // state variable to hold the current authentication status
  const [isUserLogged, setIsUserLogged] = useState(false);
  // state variable to hold the role of the current user
  const [role, setRole] = useState(null);

  // AuthContext.Provider is a component that passes its value property down to every children.
  // If the children uses useContext(AuthContext), it can access every property of AuthContext,
  // e.g. isUserLogged or setRole
  return (
    <div className='App'>
      <AuthContext.Provider value={{isUserLogged, setIsUserLogged, role, setRole}}>
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