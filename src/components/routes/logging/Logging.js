import './Logging.css';
import './Login.css';
import './Signup.css';
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
        <section id='login' className='LoggingPage'>
            <div className='FormContainer'>
                <Logo />
                <h2 id='title'>Hello Again!</h2>
                <p id='description'>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
                <form id='login-form' action=''>
                    <input onChange={e => setEmail(e.target.value)} value={email}  type='email' placeholder='E-mail' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
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
            </div>
        </section>
    );
}

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

    const [isCookWorker, setCookWorker] = useState('');

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
                    
                    <div className='extended SwitchContainer'>
                        <p>Sign up as cook worker</p>
                        <SwitchBox value={isCookWorker} onClick={() => setCookWorker(!isCookWorker)} />
                    </div>

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

export { Login, Signup };