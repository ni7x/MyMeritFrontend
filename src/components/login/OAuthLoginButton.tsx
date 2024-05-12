import React from "react";

type Props = {
  children?: React.ReactNode;
  icon: string;
};

const OAuthLoginButton: React.FC<Props> = ({ children, icon, ...props }) => {
  return (
    <div
      className="oauth-login-button grid grid-cols-[10%_1fr] p-2 rounded bg-[#44444f] border-none text-white text-sm font-semibold text-center justify-items-center cursor-pointer transition-colors duration-200 ease-linear gap-3 hover:bg-[#373741]"
      {...props}
    >
      <img className="max-w-full h-auto" src={icon} />
      <span>{children}</span>
    </div>
  );
};

export default OAuthLoginButton;
