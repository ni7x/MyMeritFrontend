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
    <main
      className={`flex-[1] ${
        isLoginPage()
          ? "m-0 p-0 w-full flex items-center justify-center"
          : // : "mt-14 mx-auto mb-0 py-8 w-[90%]"
            "w-full mx-auto xl:max-w-[1200px] 2xl:max-w-[1400px]"
      }`}
    >
      {children}
    </main>
  );
};

export default MainWrapper;
