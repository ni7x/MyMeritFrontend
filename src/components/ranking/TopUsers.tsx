import React from "react";
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import rankingBg from "../../assets/ranking-bg.png";
interface TopUsersProps {
  users: RankingUserDTO[];
}

const TopUsers: React.FC<TopUsersProps> = ({ users }) => {
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
  const topUsers = users.slice(0, 3);

  const backgroundImageStyle = {
    backgroundImage: `url(${rankingBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const cardClassName = `flex items-center flex-col gap-6 h-auto rounded-xl p-4 w-[15rem] shadow-2xl `;

  const renderUserCard = (user: RankingUserDTO) => {
    const colorClass =
      user.rank === 1
        ? " border-yellow-300 text-yellow-400"
        : user.rank === 2
        ? " border-gray-200 text-gray-200"
        : " border-yellow-600 text-yellow-600";

    return (
      <div className={cardClassName} style={backgroundImageStyle}>
        <p
          className={`relative mt-[-33px] border-2 bg-ide-color font-semibold p-2 rounded ${colorClass}`}
        >
          <FontAwesomeIcon icon={faTrophy} /> {user.rank}
        </p>
        <div className="relative z-10 flex justify-center items-center h-full w-[90%]">
          <div className="flex items-center justify-around flex-col gap-6 h-auto h-full">
            <div>
              {user.profileImageBase64 ? (
                <img
                  src={user.profileImageBase64}
                  alt={user.username}
                  className="relative z-10 rounded-full cover h-[5rem] w-[5rem] border-solid border-2 border-task-bck"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="relative z-10 rounded-full cover h-[5rem] w-[5rem] border-solid border-2 border-task-bck"
                />
              )}
            </div>
            <div className="flex">
              <h2
                className="text-xl font-semibold text-center"
                style={{ wordBreak: "break-all" }}
              >
                {user.username}
              </h2>
            </div>
            <div className="flex justify-between">
              <p className="bg-secondary-bg-color  text-[17px] font-semibold w-auto rounded inline-block text-emerald-400">
                {user.meritPoints} MS
              </p>
            </div>
            <ul className="flex items-center justify-center gap-3">
              {user.languages.slice(0, 2).map((language) => {
                const color =
                  languageColors[language.toUpperCase()] ?? "#8c8f9f";
                return (
                  <li
                    className="px-3 py-1 text-sm rounded-md font-medium bg-secondary-bg-color"
                    style={{
                      border: `2px solid ${color}`,
                      color: color,
                    }}
                    key={language}
                  >
                    {language}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-4">
      <div className="py-5">
        {topUsers.length >= 2 ? (
          renderUserCard(topUsers[1])
        ) : (
          <div
            className={
              cardClassName +
              " h-full flex items-center justify-center font-semibold text-task-lighter"
            }
            style={backgroundImageStyle}
          >
            NO ONE YET
          </div>
        )}
      </div>
      {topUsers.length >= 1 ? (
        renderUserCard(topUsers[0])
      ) : (
        <div
          className={
            cardClassName +
            " h-full flex items-center justify-center font-semibold text-task-lighter"
          }
          style={backgroundImageStyle}
        >
          NO ONE YET
        </div>
      )}
      <div className="py-5">
        {topUsers.length >= 3 ? (
          renderUserCard(topUsers[2])
        ) : (
          <div
            className={
              cardClassName +
              " h-full flex items-center justify-center font-semibold text-task-lighter"
            }
            style={backgroundImageStyle}
          >
            NO ONE YET
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsers;
