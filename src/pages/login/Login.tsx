import React from 'react';
import "./login.css";

import Input from '../../components/login/Input';
import Divider from '../../components/login/Divider';

const Login: React.FC = () => {
    return (
        <div className="login-box">
            <h1>Welcome back!</h1>
            <form>
                <Input type="text" placeholder="email" />
                <Input type="password" placeholder="password" />

                <a class="forgot-password" href="#">forgot password?</a>

                <button type="submit">
                    Log In
                </button>
            </form>

            <Divider>or</Divider>
            {/*
            <div className="oauth-login">
                <OAuthLoginButton provider="google" />
                <OAuthLoginButton provider="github" />
            </div> */}
        </div>
    );
}

export default Login;