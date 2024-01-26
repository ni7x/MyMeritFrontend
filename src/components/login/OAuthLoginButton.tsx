import React from 'react';
import './OAuthLoginButton.css';

type Props = {
    children?: React.ReactNode,
    icon: string
}

const OAuthLoginButton: React.FC<Props> = ({children, icon, ...props}) => {
    return (
        <button className={"oauth-login-button"} {...props}>
            <img src={icon}/>
            <span>{children}</span>
        </button>
    );
}

export default OAuthLoginButton;