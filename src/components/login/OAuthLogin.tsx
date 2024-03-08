import React from 'react';

import GoogleLogo from '../../assets/google-logo.png';
import GithubLogo from '../../assets/github-icon.svg';

import OAuthLoginButton from './OAuthLoginButton';

const OAuthLogin: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <OAuthLoginButton icon={GoogleLogo}>Log in with Google</OAuthLoginButton>
            <OAuthLoginButton icon={GithubLogo}>Log in with Github</OAuthLoginButton>
        </div>
    );
}

export default OAuthLogin;