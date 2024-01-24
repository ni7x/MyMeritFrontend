import React, { InputHTMLAttributes } from 'react';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ type ,...props }) => {
    return (
        <input type={type} {...props} />
    );
}

export default Input;