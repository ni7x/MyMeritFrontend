import { useLocation } from "react-router-dom";

const MainWrapper = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isLoginPage = (): boolean => {
    return location.pathname === "/login" || location.pathname === "/register";
  };

  return (
    <div
      className={`${
        isLoginPage()
          ? "m-0 p-0 h-lvh w-full flex items-center justify-center"
          : "mt-14 mx-auto mb-0 py-8 w-[90%]"
      }`}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
