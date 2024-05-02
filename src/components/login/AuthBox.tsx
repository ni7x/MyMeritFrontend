type childrenProps = {
  children: JSX.Element | JSX.Element[] | undefined;
};

const AuthBox = ({ children }: childrenProps) => {
  return (
    <div className="py-6 px-5 bg-secondary-bg-color shadow-md rounded-2xl w-72 select-none">
      {children}
    </div>
  );
};

export default AuthBox;
