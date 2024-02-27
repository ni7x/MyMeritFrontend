const SecondWrapper = ({ children }: { children: JSX.Element }) => {
  return <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto">{children}</div>;
};

export default SecondWrapper;
