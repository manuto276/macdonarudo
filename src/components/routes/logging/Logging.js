import './Logging.css';
import './Login.css';
import './Signup.css';
import { Logo } from '../../logo/Logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';
import axios from 'axios';

function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (event) => {
        // preventDefault to prevent automatic page reload due to submit button!
        event.preventDefault();
        const response =axios.post('http://localhost:3001/api/user/login/', {
            email: email,
            password: password,
        }, {withCredentials: true}).then((response) => {
            console.log(response);
            navigate('/');
        }).catch((error) => alert(error))
    };
    

    return (
        <section id='login' className='LoggingPage'>
            <div className='FormContainer'>
                <Logo />
                <h2 id='title'>Hello Again!</h2>
                <p id='description'>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
                <form id='login-form' action=''>
                    <input onChange={e => setEmail(e.target.value)} value={email}  type='email' placeholder='E-mail' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                    <button id='sign-in-button' type='submit' form='login-form' value='Login' onClick={login}>
                        <SlideEffect height='1rem'>Sign in</SlideEffect>
                    </button>
                    <button className='Secondary' type='submit' value='Sign up' onClick={() => navigate('/user/signup')}>
                        <SlideEffect height='1rem'>Don't have an account? Sign up</SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

function Signup(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bdate, setBdate] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault();
        if(firstName.length === 0 || lastName.length === 0
            || bdate.length === 0 || city.length === 0 || email.length === 0
            || password.length === 0 || confirmPassword.length === 0){
                return;
           }
        axios.post('http://localhost:3001/api/user/', {
            firstName: firstName,
            lastName: lastName,
            bdate: bdate,
            city: city,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }).then((response) => {
            alert('Signup successful.');
            console.log(response.data);
            navigate('/user/login/');
        }).catch((error) => alert('Error: ' + error));
    }

    return (
        <section id='signup' className='LoggingPage'>
            <div className='FormContainer'>
                <Logo />
                <h2 id='title'>Welcome, fella!</h2>
                <p id='description'>Welcome to McDonarudo&#174;.<br/>Please fill the form below to register on this site.</p>
                <form id='signup-form' action=''>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First name' />
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last name' />
                    <input type='date' value={bdate} onChange={e => setBdate(e.target.value)} placeholder='Date of birth' />
                    <input type='text' value={city} onChange={e => setCity(e.target.value)} placeholder='City' />
                    <input className='extended' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='E-mail' />
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
                    <button className='extended' onClick={signup} id='sign-in-button' type='submit' form='signup-form' value='Sign up'>
                        <SlideEffect height='1rem'>Sign in</SlideEffect>
                    </button>
                    <button className='Secondary extended' onClick={() => navigate('/user/login/')} type='submit' value='Sign in'>
                        <SlideEffect height='1rem'>Already have an account? Sign in</SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

export { Login, Signup };