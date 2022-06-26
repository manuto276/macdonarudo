import './Signup.css'

import { Logo } from '../../logo/Logo';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';
import axios from 'axios';
import { SwitchBox } from '../../switchbox/SwitchBox';

function Signup(props) {
    // these are state variables that hold the content of the fields needed
    // to register the user.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bdate, setBdate] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isCookWorker, setCookWorker] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    
    // this hook allows navigation to a specified path
    const navigate = useNavigate();

    // sends a POST request to /api/user/ in order to create a new user.
    const signup = () => {
        // if any of the necessary fields is empty, don't even try to send
        // the request, since it would receive an error response
        if(firstName.length === 0 || lastName.length === 0
            || bdate.length === 0 || city.length === 0 || email.length === 0
            || password.length === 0 || confirmPassword.length === 0){
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
            confirmPassword: confirmPassword
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
                { errorMessage !== null ? <p className='error'>{errorMessage}</p> : null}
                <form id='signup-form' action=''>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First name' />
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last name' />
                    <input type='date' value={bdate} onChange={e => setBdate(e.target.value)} placeholder='Date of birth' />
                    <input type='text' value={city} onChange={e => setCity(e.target.value)} placeholder='City' />
                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='E-mail' />
                    <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    <input type={isPasswordVisible ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
                    
                    <SwitchBox label='Show password' value={isPasswordVisible} onClick={() => setPasswordVisible(!isPasswordVisible)} />
                    <SwitchBox label='Sign up as cook worker' value={isCookWorker} onClick={() => setCookWorker(!isCookWorker)} />

                    <button className='extended' onClick={(event) => {
                        // prevent page refresh by clicking the sign up button
                        event.preventDefault();
                        signup();
                    }} id='sign-in-button' type='submit' form='signup-form' value='Sign up'>
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