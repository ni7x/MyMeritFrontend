import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faListCheck,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import MainWrapper from "../MainWrapper";
import SecondWrapper from "../SecondWrapper";
import MeritLink from "./MeritLink";
import meritLogo from "../../assets/mymerit_logo.png";

const Navbar = () => {
  const { isAuthenticated, userData, signOut } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return;
  }

  return (
    <nav className="w-full h-14 z-[1000] flex items-center bg-secondary-bg-color text-base border-b-[1px] border-main-border border-solid">
      <MainWrapper>
        <SecondWrapper>
          <ul className="flex flex-row gap-8 w-full list-none items-center">
            <MeritLink to="/">
              <img className="w-8 h-8" width="32" height="32" src={meritLogo} />
            </MeritLink>

            <MeritLink to="/jobs">Offers</MeritLink>

            {/* {isAuthenticated() && <MeritLink to="/mytasks">My tasks</MeritLink>} */}

            {isAuthenticated() && <MeritLink to="/rewards">Rewards</MeritLink>}

            <li className="ml-auto z-[1000]">
              <div className="w-8 h-8 rounded-full flex justify-center items-center group relative">
                <Link to={`${isAuthenticated() ? "/profile" : "/login"}`}>
                  {userData?.imageBase64 ? (
                    <img
                      src={userData.imageBase64}
                      alt="avatar"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="w-full h-full"
                      icon={faCircleUser}
                    />
                  )}
                </Link>
                <div className="absolute right-0 xl:right-auto top-full flex flex-col gap-2 opacity-0 p-4 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-200 border-solid border-[1px] border-main-bg-color bg-secondary-bg-color rounded-md">
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
                        <p className="text-sm whitespace-nowrap">
                          Your profile
                        </p>
                      </Link>
                      <Link
                        to="/profile/tasks"
                        className="hover:opacity-70 transition-all transition-duration-200 w-max flex flex-row gap-2 justify-left items-center"
                      >
                        <FontAwesomeIcon
                          icon={faListCheck}
                          className="w-4 h-4"
                        />
                        <p className="text-sm whitespace-nowrap">Your tasks</p>
                      </Link>
                      <Link
                        to="/profile/purchases"
                        className="hover:opacity-70 transition-all transition-duration-200 w-max flex flex-row gap-2 justify-left items-center"
                      >
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
        </SecondWrapper>
      </MainWrapper>
    </nav>
  );
};

export default Navbar;
