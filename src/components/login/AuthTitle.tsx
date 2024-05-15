const AuthTitle = ({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[] | string;
  className?: string | string[];
}) => {
  return (
    <h1
      className={`pb-2 m-0 text-lg text-center font-semibold ${
        className ? className : ""
      }`}
    >
      {children}
    </h1>
  );
};

export default AuthTitle;
