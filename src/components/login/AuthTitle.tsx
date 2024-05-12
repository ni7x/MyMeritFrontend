const AuthTitle = ({
  children,
  className,
}: {
  children: string;
  className: string | string[];
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
