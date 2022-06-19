import './Login.css';
import { Logo } from '../../logo/Logo';

function Login(props) {
    return (
        <section id='login'>
            <div className='FormContainer'>
                <Logo />
                <hgroup>
                    <h2>Hello Again!</h2>
                    <p>It's nice to have you back to McDonarudo&#174;.<br/>Please fill the form below to sign into the site.</p>
                </hgroup>
                <form id='login-form'>
                    <input type='email' placeholder='E-mail' />
                    <input type='password' placeholder='Password' />
                    <button id='sign-in-button' type='submit' form='login-form' value='Login'><p className='btn'>Sign in</p></button>
                    <button className='Secondary' type='submit' form='login-form' value='Login'><p className='btn'>Don't have an account? Sign up</p></button>
                </form>
            </div>
        </section>
    );
}

export { Login };