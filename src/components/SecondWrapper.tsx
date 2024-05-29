const SecondWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const isNotFoundPage = (): boolean => {
    return location.pathname === "/404";
  };

  return (
    <div className={`${isNotFoundPage() ? "h-full" : "p-4 sm:p-8 h-full"}`}>
      {children}
    </div>
  );
};

export default SecondWrapper;
