import React from 'react';
import './OAuthLogin.css';

import OAuthLoginButton from './OAuthLoginButton';

const OAuthLogin: React.FC = () => {
    return (
        <div className="oauth-login">
            <OAuthLoginButton icon="">Log in with Google</OAuthLoginButton>
            <OAuthLoginButton icon="">Log in with Github</OAuthLoginButton>
        </div>
    );
}

export default OAuthLogin;