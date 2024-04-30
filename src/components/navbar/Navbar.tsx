import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getUser } from "../../services/UserService";
import User from "../../types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleUser,
  faClockRotateLeft,
  faRightToBracket,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isAuthenticated, userData, signOut } = useAuth();
  // const { user, setUser } = useState<User | null>(null);
  const location = useLocation();

  // useEffect(() => {
  //   getUser().then((user: User) => {
  //     setUser(user);
  //     console.log(user);
  //   });
  // }, []);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return;
  }

  return (
    <nav className="fixed w-full top-0 h-14 z-[1000] flex items-center bg-secondary-bg-color text-base border-b-[1px] border-main-border border-solid">
      <div className="w-[90%] mx-auto">
        <ul className="flex flex-row gap-8 w-full xl:w-[60%] mx-auto list-none items-center">
          <li>
            <Link to="/">home</Link>{" "}
          </li>

          {isAuthenticated() && (
            <li>
              <Link to="/mytasks">my tasks</Link>
            </li>
          )}

          <li>
            <Link to="/contact">contact</Link>
          </li>
          {/* } */}

          {isAuthenticated() && (
            <li>
              <Link to="/rewards">rewards</Link>
            </li>
          )}

          <li className="ml-auto">
            <div className="w-8 h-8 rounded-full flex justify-center items-center group relative">
              {isAuthenticated() && userData?.imageBase64 && (
                <Link to="/profile">
                  <img
                    src={userData.imageBase64}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                </Link>
              )}

              {isAuthenticated() && !userData?.imageBase64 && (
                <Link to="/profile">
                  <FontAwesomeIcon
                    className="w-full h-full"
                    icon={faCircleUser}
                  />
                </Link>
              )}

              {!isAuthenticated() && (
                <Link to="/login">
                  <FontAwesomeIcon
                    className="w-full h-full"
                    icon={faCircleUser}
                  />
                </Link>
              )}

              <div className="absolute top-full flex flex-col gap-2 opacity-0 p-4 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-200 border-solid border-[1px] border-main-bg-color bg-secondary-bg-color rounded-md">
                {isAuthenticated() && (
                  <>
                    <p className="text-sm mb-2">
                      Hello,{" "}
                      <span className="font-semibold">
                        {userData?.username}
                      </span>
                    </p>

                    <Link
                      to="/profile"
                      className="hover:opacity-70 transition-all w-max transition-duration-200 flex flex-row gap-2 justify-left items-center"
                    >
                      <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={faCircleUser}
                      />
                      <p className="text-sm whitespace-nowrap">Your account</p>
                    </Link>
                    <Link
                      to="/rewards"
                      className="hover:opacity-70 transition-all transition-duration-200 w-max flex flex-row gap-2 justify-left items-center"
                    >
                      {/* <FontAwesomeIcon icon={faClockRotateLeft} /> */}
                      <FontAwesomeIcon icon={faReceipt} className="w-4 h-4" />
                      <p className="text-sm whitespace-nowrap">
                        Purchase history
                      </p>
                    </Link>
                    <hr className="w-full border-main-border border-solid" />
                  </>
                )}
                {isAuthenticated() ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full hover:opacity-70 transition-opacity duration-200"
                  >
                    {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                    <p className="text-sm whitespace-nowrap text-center">
                      Sign out
                    </p>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full hover:opacity-70 transition-opacity duration-200"
                  >
                    {/* <FontAwesomeIcon icon={faRightToBracket} /> */}
                    <p className="text-sm whitespace-nowrap text-center">
                      Sign in
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
