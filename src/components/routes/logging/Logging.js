import './Logging.css';
import './Login.css';
import './Signup.css';
import { Logo } from '../../logo/Logo';

import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';

function Login(props) {
    const login = async () => {
        const response = await axios.post('http://localhost:3001/api/user/login/', {
            'email': email,
            'password': password
        })
        console.log(response)
        navigate('/',{replace: true})
    }
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                    <button className='Secondary' type='submit' value='Sign up'>
                        <SlideEffect height='1rem'>Don't have an account? Sign up</SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

function Signup(props) {
    return (
        <section id='signup' className='LoggingPage'>
            <div className='FormContainer'>
                <Logo />
                <h2 id='title'>Welcome, fella!</h2>
                <p id='description'>Welcome to McDonarudo&#174;.<br/>Please fill the form below to register on this site.</p>
                <form id='signup-form' action=''>
                    <input type='text' placeholder='First name' />
                    <input type='text' placeholder='Last name' />
                    <input type='date' placeholder='Date of birth' />
                    <input type='text' placeholder='City' />
                    <input className='extended' type='email' placeholder='E-mail' />
                    <input type='password' placeholder='Password' />
                    <input type='password' placeholder='Confirm password' />
                    <button className='extended' id='sign-in-button' type='submit' form='signup-form' value='Sign up'>
                        <SlideEffect height='1rem'>Sign in</SlideEffect>
                    </button>
                    <button className='Secondary extended' type='submit' value='Sign in'>
                        <SlideEffect height='1rem'>Already have an account? Sign in</SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

export { Login, Signup };