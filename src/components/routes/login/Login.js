import './Login.css';
import { Logo } from '../../logo/Logo';
import { Button } from '../../button/Button';
import { Link } from '../../link/Link';
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
                    <p>Welcome back to McDonarudo! Please fill the form below to sign into the site.</p>
                </hgroup>
                <form action=''>
                    <input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='E-mail' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                </form>
                <div className='ButtonContainer'>
                    <Link>
                        <div onClick={login}>
                            <Button><p className='btn'>Sign in</p></Button> 
                        </div>
                    </Link>
                    <Link>
                        <Button type='secondary'><p className='btn'>Don't have an account? Sign up</p></Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export { Login };