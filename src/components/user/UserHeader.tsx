import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types";
import { useState, useEffect } from "react";
import { FastAverageColor } from "fast-average-color";
import UserSection from "./UserSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserHeader = ({ user }: { user: User }) => {
  const [backgroundColor, setBackgroundColor] = useState<string | false>(false);

  useEffect(() => {
    if (!user.imageBase64) {
      setBackgroundColor("#ffffff");
      return;
    }
    const fac = new FastAverageColor();
    fac
      .getColorAsync(user.imageBase64)
      .then((color) => {
        setBackgroundColor(color.hex);
      })
      .catch((e) => {
        console.error(e);
        setBackgroundColor("#ffffff");
      });
  }, []);

  return (
    <UserSection>
      <div className="pb-[4.5rem]">
        <div className="relative">
          <div className="absolute top-0 right-0 p-4 flex flex-col gap-2">
            <p
              className={`shadow px-2 py-1 leading-2 flex justify-center rounded-lg text-sm lowercase h-max font-semibold text-white ${
                user.role === "user" && "bg-green-700"
              } ${user.role === "company" && "bg-blue-500"}`}
            >
              {user.role}
            </p>
          </div>
          {backgroundColor != false ? (
            <div
              className="rounded-t-lg h-40"
              style={{ backgroundColor }}
            ></div>
          ) : (
            <Skeleton height={160} />
          )}
          <div className="absolute w-full flex justify-center px-4 align-center bottom-[-4.5rem]">
            <div className="h-36 w-36 rounded-full bg-main-darker">
              {user.imageBase64 ? (
                <img
                  src={user.imageBase64}
                  alt="avatar"
                  className="w-full h-full rounded-full border-2 border-main-darker border-solid object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  className="w-full h-full text-6xl text-white"
                  icon={faCircleUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center px-4 py-2">
        <div className="text-xl sm:text-2xl text-white font-semibold flex justify-center flex-row gap-2 items-center">
          <p>{user.username}</p>
        </div>
        <p className="text-sm text-gray-500 pb-4">{user.email}</p>
      </div>
    </UserSection>
  );
};

export default UserHeader;
