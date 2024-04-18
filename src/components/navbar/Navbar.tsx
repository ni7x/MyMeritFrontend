import React, { useEffect, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import myMeritLogo from "../../assets/mymerit_logo.png";

const Navbar: React.FC = () => {
  const { isAuthenticated, userData, signOut } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
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
              {isAuthenticated() && userData?.imageUrl && (
                <Link to="/profile">
                  <img
                    src={userData.imageUrl}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                </Link>
              )}

              {isAuthenticated() && !userData?.imageUrl && (
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
                      className="w-full hover:translate-x-1 transition-all w-max transition-duration-200 flex flex-row gap-2 justify-left items-center"
                    >
                      <FontAwesomeIcon
                        className="max-w-full"
                        icon={faCircleUser}
                      />
                      <p className="text-sm whitespace-nowrap">Your account</p>
                    </Link>
                    <Link
                      to="/rewards"
                      className="w-full hover:translate-x-1 transition-all transition-duration-200 flex flex-row gap-2 justify-left items-center"
                    >
                      <FontAwesomeIcon icon={faClockRotateLeft} />
                      <p className="text-sm whitespace-nowrap">
                        Purchase history
                      </p>
                    </Link>
                    <hr className="w-full border-main-border border-solid" />
                  </>
                )}
                {isAuthenticated() ? (
                  <button onClick={() => signOut()} className="w-full">
                    {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                    <p className="text-sm whitespace-nowrap text-center">
                      Sign out
                    </p>
                  </button>
                ) : (
                  <Link to="/login" className="w-full">
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
