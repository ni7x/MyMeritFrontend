const SecondWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <div className="p-8 h-full">{children}</div>;
};

export default SecondWrapper;
