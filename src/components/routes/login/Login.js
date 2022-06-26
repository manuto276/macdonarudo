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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // this hook allows navigation to a specified path
    const navigate = useNavigate();

    // this hook refreshes the UI whenever the value provided by AuthContex changes.
    // See comments in App.js for more explanation
    const authContextHook = useContext(AuthContext);

    // sends a POST request to /api/user/login/ to attempt a login
    const login = () => {
        // if the fields are empty, return
        if(email.length === 0 || password.length === 0){
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
        }).catch((error) => alert(error))
    };
    

    return (
        <section id='login'>
            <Logo />
            <h2>Hello Again!</h2>
            <p>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
            { errorMessage !== null ? <p className='error'>{errorMessage}</p> : null}
            <form id='login-form' action=''>
                <input onChange={e => setEmail(e.target.value)} value={email}  type='email' placeholder='E-mail' />
                <input onChange={e => setPassword(e.target.value)} value={password} type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' />
                <SwitchBox label='Show password' value={isPasswordVisible} onClick={() => setPasswordVisible(!isPasswordVisible)} />
                <button id='sign-in-button' type='submit' form='login-form' value='Login' onClick={(event) => {
                    event.preventDefault(); // prevent page refresh when clicked
                    login();
                }}>
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