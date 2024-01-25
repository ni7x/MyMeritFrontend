import React from 'react';

import './Divider.css';

type Props = {
    children?: React.ReactNode;
}

const Divider: React.FC<Props> = ({children}) => {
    return (
        <div className="divider">
            <span>{children}</span>
        </div>
    );
}

export default Divider;