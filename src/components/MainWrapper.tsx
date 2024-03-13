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

  return (
    <div
      className={`${
        isLoginPage()
          ? "m-0 p-0 h-lvh w-full flex items-center justify-center"
          : "mt-14 mx-auto mb-0 py-8 w-[90%]"
        // "w-full mt-14 mx-auto xl:max-w-6xl 2xl:max-w-[1440px]"
      }`}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
