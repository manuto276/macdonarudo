import './Signup.css';
import { Logo } from '../../logo/Logo';

import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { SlideEffect } from '../../link/Link';

function Signup(props) {
    return (
        <section id='signup'>
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
                        <SlideEffect height='16px'><p className='btn'>Sign in</p></SlideEffect>
                    </button>
                    <button className='Secondary extended' type='submit' value='Sign in'>
                        <SlideEffect height='16px'><p className='btn'>Already have an account? Sign in</p></SlideEffect>
                    </button>
                </form>
            </div>
        </section>
    );
}

export { Signup };