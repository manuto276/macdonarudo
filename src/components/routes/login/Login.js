import './Login.css';
import { Logo } from '../../logo/Logo';

import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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
                <hgroup>
                    <h2>Hello Again!</h2>
                    <p>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
                </hgroup>
                <form id='login-form' action=''>
                    <input onChange={e => setEmail(e.target.value)} value={email}  type='email' placeholder='E-mail' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                    <button id='sign-in-button' type='submit' form='login-form' value='Login' onClick={login}><p className='btn'>Sign in</p></button>
                    <button className='Secondary' type='submit' value='Sign up'><p className='btn'>Don't have an account? Sign up</p></button>
                </form>
            </div>
        </section>
    );
}

export { Login };