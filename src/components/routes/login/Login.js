import './Login.css';
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
        <section id='login'>
            <div className='FormContainer'>
                <Logo />
                <h2 id='title'>Hello Again!</h2>
                <p id='description'>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
                <form id='login-form' action=''>
                    <input onChange={e => setEmail(e.target.value)} value={email}  type='email' placeholder='E-mail' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                    <button id='sign-in-button' type='submit' form='login-form' value='Login' onClick={login}>
                        <SlideEffect height='16px'><p className='btn'>Sign in</p></SlideEffect>
                    </button>
                    <button className='Secondary' type='submit' value='Sign up'>
                        <SlideEffect height='16px'><p className='btn'>Don't have an account? Sign up</p></SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

export { Login };