import React from 'react';

const Button = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`px-7 py-2.5 rounded text-sm font-medium ${
                isActive ? 'bg-emerald-450 text-white' : 'bg-secondary-bg-color text-task-lighter'
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
