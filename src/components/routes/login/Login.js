import './Login.css';
import { Logo } from '../../logo/Logo';
import { Button } from '../../button/Button';
import { Link } from '../../link/Link';

function Login(props) {
    return (
        <section id='login'>
            <div className='FormContainer'>
                <Logo />
                <hgroup>
                    <h2>Hello Again!</h2>
                    <p>Welcome back to McDonarudo! Please fill the form below to sign into the site.</p>
                </hgroup>
                <form>
                    <input type='email' placeholder='E-mail' />
                    <input type='password' placeholder='Password' />
                </form>
                <div className='ButtonContainer'>
                    <Link>
                        <Button><p className='btn'>Sign in</p></Button>
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