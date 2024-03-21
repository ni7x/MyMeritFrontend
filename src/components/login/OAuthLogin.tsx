import React from 'react';

import GoogleLogo from '../../assets/google-logo.png';
import GithubLogo from '../../assets/github-icon.svg';

import OAuthLoginButton from './OAuthLoginButton';

const OAuthLogin: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <a className={"grid"}
               href={import.meta.env.VITE_OAUTH2_GOOGLE}>
                <OAuthLoginButton icon={GoogleLogo}>Log in with Google</OAuthLoginButton>
            </a>
            <a className={"grid"}
               href={import.meta.env.VITE_OAUTH2_GITHUB}>
                <OAuthLoginButton icon={GithubLogo}>Log in with Github</OAuthLoginButton>
            </a>
        </div>
    );
}

export default OAuthLogin;