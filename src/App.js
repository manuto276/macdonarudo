import './App.css';

import { Header } from './components/header/Header';
import { Home } from './components/routes/home/Home';
import { Menu } from './components/routes/menu/Menu';
import { Footer } from './components/footer/Footer';
import { CartView } from './components/cartview/CartView';
import { AddProductView } from './components/addproductview/AddProductView';
import { DeleteProductView } from './components/deleteproductview/DeleteProductView';
import { Login } from './components/routes/login/Login';
import { Signup } from './components/routes/signup/Signup';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Orders } from './components/routes/orders/Orders';
import { MyOrders } from './components/routes/myorders/MyOrders';
import { Transactions } from './components/routes/transactions/Transactions';

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
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);

  function dismissDialog() {
    if (isDialogVisible) {
      setDialogVisible(false);

      // When the user closes the dialog, then we should clear the view 
      // so the data inside it can be re-initialized when it opens again.
      setTimeout(function () {
        setDialogContent(null);
      }, 350);
    }
    if (isShoppingCartVisible)
      setShoppingCartVisible(false);
  }

  const getMenu = async () => {
    const host = process.env.REACT_APP_API_HOST;
    await axios.get(`http://${host}/api/products/`)
    .then((response) => {
        console.log("After then");
        setMenu(response.data);            
    })
    .catch((error) => {
      alert(error);
    });
    console.log("After await");
  }

  const getCart = () => {
    const host = process.env.REACT_APP_API_HOST;
    axios.get(`http://${host}/api/orders/cart/`,{withCredentials: true}).then((response) => {
    setCart(response.data);
    })
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
  useEffect(checkAuthentication, [isUserLogged]);
  /*useEffect(() => {
    if(menu.length === 0){
      getMenu();
    }
  }, [])*/
  useEffect(() => {
      if ((isDialogVisible && dialogContent !== null) || isShoppingCartVisible)
          document.body.style.overflow = 'hidden';
      else
          document.body.style.overflow = 'initial';
  });

  // AuthContext.Provider is a component that passes its value property down to every children.
  // If the children uses useContext(AuthContext), it can access every property of AuthContext,
  // e.g. isUserLogged or setRole
  return (
    <div className='App'>
      <AuthContext.Provider value={{
        isUserLogged, setIsUserLogged, role, setRole, menu, setMenu, getMenu,
        cart, getCart
        }}>
        <BrowserRouter>
          {shouldShowNavBars() ?
            <Header onCartClick={() => {
              getCart();
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
                onEditClick={(id, name, category, price, icon) => {
                  setDialogVisible(true); 
                  setDialogContent(<AddProductView id={id} name={name} category={category} price={price} icon={icon} onDismiss={dismissDialog} edit />)
                }}
                onDeleteClick={(id, name) => {
                  setDialogVisible(true);
                  setDialogContent(<DeleteProductView productId={id} productName={name} onDismiss={dismissDialog} />)
                }} /> } />
            </Route>
            <Route path='user/login' element={ <Login /> } />
            <Route path='user/signup' element={ <Signup /> } />
            <Route path='user/orders' element={ <MyOrders /> } />
            <Route path='transactions' element={ <Transactions /> } />
            <Route path='orders' element={ <Orders /> } />
          </Routes>
          {shouldShowNavBars() ?
            <Footer /> : null }
          <Dialog view={dialogContent} visible={isDialogVisible} onDismiss={dismissDialog} />
          <Dialog className='ShoppingCartDialog' view={<CartView onDismiss={dismissDialog} />} visible={isShoppingCartVisible} onDismiss={dismissDialog} />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

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

export { App, AuthContext };