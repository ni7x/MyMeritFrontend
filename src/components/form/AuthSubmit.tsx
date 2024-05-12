const AuthSubmit = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <button
      className=" p-4 rounded leading-none  bg-success-color border-none text-white font-bold text-sm cursor-pointer text- transition-colors duration-100 ease-linear hover:bg-success-darker-color"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthSubmit;
