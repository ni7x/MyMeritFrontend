import React from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';

import Input from '../../components/login/Input';
import Divider from '../../components/login/Divider';
import OAuthLogin from '../../components/login/OAuthLogin';

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="login-box">
            <h1>Welcome back!</h1>
            <form>
                <Input type="text" placeholder="email" />
                <Input type="password" placeholder="password" />

                <a className="forgot-password" href="#">forgot password?</a>

                <button type="submit">
                    Log In
                </button>
            </form>
            <Divider>or</Divider>
            <OAuthLogin />

            <p className="signup-link">Don't have an account? <a href="#" onClick={()=>{navigate("/register")}}>Sign up</a></p>
        </div>
    );
}

export default Login;