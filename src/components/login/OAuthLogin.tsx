import React from 'react';

import GoogleLogo from '../../assets/google-logo.png';
import GithubLogo from '../../assets/github-icon.svg';

import OAuthLoginButton from './OAuthLoginButton';

const OAuthLogin: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <a className={"grid"}
               href={"http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:5173/oauth2/redirect"}>
                <OAuthLoginButton icon={GoogleLogo}>Log in with Google</OAuthLoginButton>
            </a>
            <a className={"grid"}
               href={"http://localhost:8080/oauth2/authorize/github?redirect_uri=http://localhost:5173/oauth2/redirect"}>
                <OAuthLoginButton icon={GithubLogo}>Log in with Github</OAuthLoginButton>
            </a>
        </div>
    );
}

export default OAuthLogin;