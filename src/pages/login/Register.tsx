import React from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';

import Input from '../../components/login/Input';
import Divider from '../../components/login/Divider';
import OAuthLogin from '../../components/login/OAuthLogin';

const Register: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="login-box">
            <h1>Create an account</h1>
            <form>
                <Input type="text" placeholder="email" name="email" />
                <Input type="password" placeholder="password" name="password" />
                <Input type="password" placeholder="repeat password" name="repeat-password" />

                <button type="submit">
                    Register
                </button>
            </form>

            <p className="signup-link">Already have an account? <a href="#" onClick={()=>{navigate("/login")}}>Log in</a></p>
        </div>
    );
}

export default Register;