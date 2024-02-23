const SecondWrapper = ({ children }: { children: JSX.Element }) => {
  return <div className="w-full xl:w-[60%] mx-auto">{children}</div>;
};

export default SecondWrapper;
