import './Login.css';

import { Logo } from '../../logo/Logo';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';
import axios from 'axios';
import { AuthContext } from '../../../App';
import { SwitchBox } from '../../switchbox/SwitchBox';

function Login(props) {
    // these are state variables that hold the content of the fields needed
    // to register the user.

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // this hook allows navigation to a specified path
    const navigate = useNavigate();

    // this hook refreshes the UI whenever the value provided by AuthContex changes.
    // See comments in App.js for more explanation
    const authContextHook = useContext(AuthContext);

    // sends a POST request to /api/user/login/ to attempt a login
    const login = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (email.length === 0) {
            setErrorMessage('Please add your e-mail.')
            return;
        }
        
        if (password.length === 0) {
            setErrorMessage('Please add your password.')
            return;
        }

        const host = process.env.REACT_APP_API_HOST
        // send the post request with the user credentials in the body
        axios.post(`http://${host}/api/users/login/`, {
            email: email,
            password: password,
        }, {withCredentials: true}).then((response) => {

            // if the login was successful, navigate to '/'
            authContextHook.setIsUserLogged(true);
            console.log(response);
            navigate('/', {replace: true});
        }).catch((error) => {
            const status = error.response.status;

            switch (status) {
                case 0:
                    setErrorMessage('Network error.');
                    break;
                case 401:
                    setErrorMessage('Wrong credentials');
                    break;
                default: 
                    setErrorMessage(error);
                    break;
            }
        });
    };

    return (
        <section id='login'>
            <Logo />
            <h2>Hello Again!</h2>
            <p>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
            { errorMessage !== null ? <p className='error'>Error: {errorMessage}</p> : null}
            <form id='login-form' onSubmit={(event) => login(event)}>
                <input type='email' placeholder='E-mail' name='email'/>
                <input type={isPasswordVisible ? 'text' : 'password'} name='password' placeholder='Password' />
                <SwitchBox label='Show password' value={isPasswordVisible} onClick={() => setPasswordVisible(!isPasswordVisible)} />
                <button id='sign-in-button' type='submit' form='login-form' value='Login'>
                    <SlideEffect height='1rem'>Sign in</SlideEffect>
                </button>
                <button className='Secondary' type='submit' value='Sign up' onClick={() => navigate('/user/signup')}>
                    <SlideEffect height='1rem'>Don't have an account? Sign up</SlideEffect>
                </button>
            </form>
        </section>
    );
}

export { Login };