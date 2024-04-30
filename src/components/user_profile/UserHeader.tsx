import myMeritLogo from "../../assets/mymerit_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const UserHeader = ({
  imageBase64,
  imageBig,
  username,
  email,
  role,
  points,
}: {
  imageBase64?: string;
  imageBig?: string;
  username: string;
  email: string;
  role: string;
  points: number;
}) => {
  return (
    <>
      <div className="pb-[3.5rem]">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-main-darker"></div>
          <div className="absolute top-0 left-0 p-4 flex flex-col gap-2">
            <div className="px-2 py-1 opacity-70 rounded-lg text-sm font-semibold text-white bg-main-darker">
              Credits: {points ?? 0}
            </div>
          </div>
          <div className="h-40">
            <img
              src={imageBig ?? myMeritLogo}
              alt="background"
              className={`h-full w-full object-contain rounded-t-xl ${
                imageBig ?? "bg-white "
              }`}
            />
          </div>
          <div className="absolute w-full flex justify-left px-4 align-center bottom-[-3.5rem]">
            <div className="h-28 w-28 rounded-full">
              {imageBase64 ? (
                <img
                  src={imageBase64}
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
      <div className="w-full text-left px-4 pt-2">
        <div className="text-2xl text-white font-semibold flex flex-row gap-2 items-center">
          <p>{username}</p>
          <p
            className={`px-2 py-1 leading-2 flex justify-center rounded-lg text-sm lowercase h-max font-semibold text-white ${
              role === "user" && "bg-green-700"
            } ${role === "company" && "bg-blue-500"}`}
          >
            {role}
          </p>
        </div>
        <p className="text-sm text-gray-500 pb-4">{email}</p>
      </div>
    </>
  );
};

export default UserHeader;
