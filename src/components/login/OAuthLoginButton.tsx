import React from 'react';
import './OAuthLoginButton.css';

type Props = {
    children?: React.ReactNode,
    icon: string
}

const OAuthLoginButton: React.FC<Props> = ({children, icon, ...props}) => {
    return (
        <button {...props}>
            <img src={icon}/>
            {children}
        </button>
    );
}

export default OAuthLoginButton;