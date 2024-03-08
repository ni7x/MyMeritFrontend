import React from 'react';

type Props = {
    children?: React.ReactNode;
}

const Divider: React.FC<Props> = ({children}) => {
    return (
        <div className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:h-[1px] before:bg-[#44444f] before:m-auto before:w-[45%] before:left-0 after:content-[''] after:absolute after:top-0 after:bottom-0 after:h-[1px] after:bg-[#44444f] after:m-auto after:w-[45%] after:right-0">
            <span className="block text-center text-xs text-[#535353] py-3 px-0">{children}</span>
        </div>
    );
}

export default Divider;