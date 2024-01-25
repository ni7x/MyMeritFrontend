import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { InputHTMLAttributes, useState } from 'react';

import './input.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string;
}

const Input: React.FC<CustomInputProps> = ({ type ,...props }) => {
    const [ showPassword, setShowPassword ] = useState(false);

    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    let processedType = type;
    if(type == 'password'){
        processedType = showPassword ? 'text' : 'password';
    }

    return (
        <div className="input-wrapper">
            <input type={processedType} {...props} />
            {type == 'password' && (
                <FontAwesomeIcon className="show-password" icon={showPassword ? faEyeSlash : faEye} onClick={handleShowPassword}/>
            )}

        </div>
    );
}

export default Input;