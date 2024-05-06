type childrenProps = {
  children: JSX.Element | JSX.Element[] | undefined;
  className?: string;
};

const AuthBox = ({ children, className }: childrenProps) => {
  return (
    <div
      className={`py-6 px-5 bg-secondary-bg-color shadow-md rounded-2xl w-72 select-none relative ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AuthBox;
