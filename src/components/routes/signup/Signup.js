import './Signup.css'

import { Logo } from '../../logo/Logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';
import axios from 'axios';
import { SwitchBox } from '../../switchbox/SwitchBox';

function Signup(props) {
    // these are state variables that hold the content of the fields needed
    // to register the user.

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isCookWorker, setCookWorker] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    
    // this hook allows navigation to a specified path
    const navigate = useNavigate();

    // sends a POST request to /api/user/ in order to create a new user.
    const signup = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const bdate = formData.get('bdate');
        const city = formData.get('city');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        // if any of the necessary fields is empty, don't even try to send
        // the request, since it would receive an error response

        // Adding error control over the input fields.
        if (firstName.length === 0 || lastName.length === 0 || bdate.length === 0 || city.length === 0) {
            setErrorMessage('Please fill your personal information first.');
            return;
        }

        if (email.length === 0) {
            setErrorMessage('Please add your e-mail.')
            return;
        }

        if (password.length === 0 || confirmPassword.length === 0) {
            setErrorMessage('Please add your password.')
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Password don\'t match');
            return;
        }

        const host = process.env.REACT_APP_API_HOST
        // send post request to /api/user/ to create a new user, with the user info
        // in the request body
        axios.post(`http://${host}/api/users/`, {
            firstName: firstName,
            lastName: lastName,
            bdate: bdate,
            city: city,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: isCookWorker ? 'cook' : 'customer'
        }).then((response) => {
            // if the request is successful the user was created.
            // navigate to /user/login/ to allow the user to log in
            alert('Signup successful.');
            navigate('/user/login/');
        }).catch((error) => alert('Error: ' + error));
    }

    return (
        <section id='signup' className='LoggingPage'>
            <div className='FormContainer'>
                <Logo />
                <h2>Hello There!</h2>
                <p>Welcome to McDonarudo&#174;.<br/>Please fill the form below to register on this site.</p>
                { errorMessage !== null ? <p className='error'>Error: {errorMessage}</p> : null}
                <form id='signup-form' onSubmit={signup}>
                    <input type='text' name='firstName' placeholder='First name' />
                    <input type='text' name='lastName' cityplaceholder='Last name' />
                    <input type='date' name='bdate' placeholder='Date of birth' />
                    <input type='text' name='city' placeholder='City' />
                    <input type='email' name='email' placeholder='E-mail' />
                    <input type={isPasswordVisible ? 'text' : 'password'} name='password' placeholder='Password' />
                    <input type={isPasswordVisible ? 'text' : 'password'} name='confirmPassword' placeholder='Confirm password' />
                    
                    <SwitchBox label='Show password' value={isPasswordVisible} onClick={() => setPasswordVisible(!isPasswordVisible)} />
                    <SwitchBox label='Sign up as cook worker' value={isCookWorker} onClick={() => setCookWorker(!isCookWorker)} />

                    <button className='extended' id='sign-in-button' type='submit' form='signup-form' value='Sign up'>
                        <SlideEffect height='1rem'>Sign up</SlideEffect>
                    </button>
                    <button className='Secondary extended' onClick={() => navigate('/user/login/')} type='submit' value='Sign in'>
                        <SlideEffect height='1rem'>Already have an account? Sign in</SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

export { Signup };