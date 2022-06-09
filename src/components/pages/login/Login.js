import { PrimaryButton, TertiaryButton } from '../../floatingactionbutton/FloatingActionButton';
import { Header } from '../../header/Header';
import './Login.css';

function Login(props) {
    return (
        <section id='Login'>
            <Header />
            <div className='Container'>
                <h3>Welcome back</h3>
                <p>Welcome back! Please enter your details.</p>
                <form>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Enter your email' />
                    <label>Password</label>
                    <input type='password' name='password' placeholder='•••••••' />
                </form>
                <div className='Actions'>
                    <PrimaryButton><p className='Button'>Sign in</p></PrimaryButton>
                    <TertiaryButton><p className='Button'><u>Sign up for free</u></p></TertiaryButton>
                </div>
            </div>
        </section>
    );
}

export { Login };