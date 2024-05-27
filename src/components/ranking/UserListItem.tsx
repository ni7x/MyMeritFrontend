import React from "react";
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface UserListItemProps {
  user: RankingUserDTO;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const languageColors: { [key: string]: string } = {
    JAVA: "#ec9b2a",
    PYTHON: "#40a5f8",
    JAVASCRIPT: "#f1e05a",
    CPP: "#f34b7d",
    GO: "#00ADD8",
    KOTLIN: "#A97BFF",
    TYPESCRIPT: "#46d595",
    PHP: "#c72eb3",
  };

  const shortenedNames: { [key: string]: string } = {
    JAVA: "Java",
    PYTHON: "Py",
    JAVASCRIPT: "JS",
    CPP: "C++",
    GO: "Go",
    KOTLIN: "Ktl",
    TYPESCRIPT: "TS",
    PHP: "PHP",
  };

  const colorClass =
    user.rank === 1
      ? "text-yellow-400"
      : user.rank === 2
      ? "text-gray-200"
      : user.rank === 3
      ? "text-yellow-600"
      : "text-white";

  return (
    <tr className="bg-secondary-bg-color py-3 rounded h-full">
      <td className="lg:px-8 pl-4 font-semibold py-4">
        <div className={"flex items-center gap-0.5 " + colorClass}>
          <span
            className={
              "text-task-lighter text-xs font-medium sm:text-task-lighter " +
              colorClass
            }
          >
            #
          </span>
          {user.rank}
        </div>
      </td>
      <td className="py-3 pr-5 lg:p-0 m-auto">
        {user.profileImageBase64 ? (
          <img
            src={user.profileImageBase64}
            alt={user.username}
            className="hidden lg:inline lg:w-[2.5rem] lg:h-[2.5rem] rounded-full"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserCircle}
            className="hidden lg:inline lg:w-[2.5rem] lg:h-[2.5rem] rounded-full align-middle"
          />
        )}

        <p className="block truncate lg:ml-4">{user.username}</p>
      </td>
      <td className="md:px-0 lg:px-10 py-3 px-5">
        <div className="w-full flex justify-center">
          <p className="bg-ide-color p-2 px-4 text-sm font-semibold w-auto rounded inline-block text-emerald-400">
            {user.meritPoints} <span className="hidden md:inline">MS</span>
          </p>
        </div>
      </td>
      <td className="hidden md:flex justify-center items-center lg:pr-5 overflow-x-auto overflow-y-hidden lg:overflow-hidden h-full gap-2 py-3">
        {user.languages.map((language) => {
          const color = languageColors[language.toUpperCase()] ?? "#8c8f9f";
          return (
            <p
              className="px-3 py-1 text-sm rounded-md font-medium"
              style={{
                border: `2px solid ${color}`,
                color: color,
              }}
              key={language}
            >
              <span className="block lg:hidden">
                {shortenedNames[language.toUpperCase()] ?? language}
              </span>
              <span className="hidden lg:block">{language}</span>
            </p>
          );
        })}
      </td>
    </tr>
  );
};

export default UserListItem;
