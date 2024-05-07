const AuthSubmit = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <button
      className=" p-4 rounded leading-none bg-[#06a58f] border-none text-white font-bold text-sm cursor-pointer text- transition-colors duration-200 ease-linear hover:bg-[#057767]"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthSubmit;
