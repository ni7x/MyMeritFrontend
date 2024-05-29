import { useLocation } from "react-router-dom";

const MainWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const location = useLocation();
  const isLoginPage = (): boolean => {
    return location.pathname === "/login" || location.pathname === "/register";
  };

  const isNotFoundPage = (): boolean => {
    return location.pathname === "/404";
  };

  return (
    <main
      className={`flex-[1] ${
        isLoginPage()
          ? "m-0 p-0 w-full flex items-center justify-center"
          : isNotFoundPage()
          ? "relative"
          : "w-full mx-auto xl:max-w-[1200px] 2xl:max-w-[1400px]"
      }`}
    >
      {children}
    </main>
  );
};

export default MainWrapper;
