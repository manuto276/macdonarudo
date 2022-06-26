import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/routes/home/Home';
import { Menu } from './components/routes/menu/Menu';
import axios from 'axios';
import { Footer } from './components/footer/Footer';
import { CartView } from './components/cartview/CartView';
import { AddProductView } from './components/addproductview/AddProductView';
import { DeleteProductView } from './components/deleteproductview/DeleteProductView';
import { Login } from './components/routes/login/Login';
import { Signup } from './components/routes/signup/Signup';

const AuthContext = createContext();

function App() {
  // check the user authentication by sending a get to
  // /api/user/authenticated. If the client has an access_token cookie,
  // this request will verify if it's valid. If it is, the user is authenticated with.
  // Otherwise they will receive a 401 status response.
  
  // state variable to hold the current authentication status
  const [isUserLogged, setIsUserLogged] = useState(false);
  // state variable to hold the role of the current user
  const [role, setRole] = useState(null);

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isShoppingCartVisible, setShoppingCartVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogClasses, setDialogClasses] = useState('');

  const [menu, setMenu] = useState([])

  function dismissDialog() {
    if (isDialogVisible)
      setDialogVisible(false);
    if (isShoppingCartVisible)
      setShoppingCartVisible(false);
  }

  const getMenu = async () => {
    const host = process.env.REACT_APP_API_HOST;
    axios.get(`http://${host}/api/products/`).then((response) => {
        setMenu(response.data);            
    }).catch((error) => {
        alert(error);
    });
  }

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
  useEffect(() => {
      if ((isDialogVisible && dialogContent !== null) || isShoppingCartVisible)
          document.body.style.overflow = 'hidden';
      else
          document.body.style.overflow = 'initial';
        
      // When the user closes the dialog, then we should clear the view 
      // so the data inside it can be re-initialized when it opens again.
      if (isDialogVisible === false)
        setTimeout(function () {
          setDialogContent(null)
        }, 350);
  });

  // AuthContext.Provider is a component that passes its value property down to every children.
  // If the children uses useContext(AuthContext), it can access every property of AuthContext,
  // e.g. isUserLogged or setRole
  return (
    <div className='App'>
      <AuthContext.Provider value={{
        isUserLogged, setIsUserLogged, role, setRole, menu, setMenu, getMenu
        }}>
        <BrowserRouter>
          {shouldShowNavBars() ?
            <Header onCartClick={() => {
              setShoppingCartVisible(true); 
            }} /> : null}
          <Routes>
            <Route path='/'>
              <Route path='/' element={ <Home /> } />
              <Route path='/menu' 
                element={
                <Menu onAddClick={() => {
                  setDialogVisible(true); 
                  setDialogContent(<AddProductView onDismiss={dismissDialog} />)
                }}
                onEditClick={(id, name, price) => {
                  setDialogVisible(true); 
                  setDialogContent(<AddProductView onDismiss={dismissDialog} />)
                }}
                onDeleteClick={(id, name) => {
                  setDialogVisible(true);
                  setDialogContent(<DeleteProductView productId={id} productName={name} onDismiss={dismissDialog} />)
                }} /> } />
            </Route>
            <Route path='user/login' element={ <Login /> } />
            <Route path='user/signup' element={ <Signup /> } />
          </Routes>
          {shouldShowNavBars() ?
            <Footer /> : null }
          <Dialog className={dialogClasses} view={dialogContent} visible={isDialogVisible} onDismiss={dismissDialog} />
          <Dialog className='ShoppingCartDialog' view={<CartView onDismiss={dismissDialog} />} visible={isShoppingCartVisible} onDismiss={dismissDialog} />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export { App, AuthContext };

function Dialog(props) {
  let view = null;

  if (props.view != null)
    view = React.cloneElement(props.view, {onDismiss: props.onDismiss});
  
  return (
    <div className={'Dialog' + (props.visible ? ' Visible' : '') + (props.className ? ' ' + props.className : '')}>
      <div className='Overlay' onClick={props.onDismiss ?? null} />
      <div className='View'>{view}</div>
    </div>
  );
}

/** 
 * This function checks whether we should show or not the Header and Footer.
 * More specifically: if the current path is login or signup then we should not
 * show them.
 */
function shouldShowNavBars() {
  return !window.location.href.includes('login') && !window.location.href.includes('signup');
}