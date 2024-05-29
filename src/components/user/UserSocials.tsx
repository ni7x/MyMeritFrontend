import { User } from "@types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import UserSection from "./UserSection";

const UserSocials = ({ user }: { user: User }) => {
  const hasSocials = () => {
    return (
      (user.socialLink1 && user.socialLink1 != "") ||
      (user.socialLink2 && user.socialLink2 != "") ||
      (user.socialLink3 && user.socialLink3 != "")
    );
  };

  if (!hasSocials()) {
    return null;
  }

  return (
    <UserSection>
      <h1 className="text-2xl opacity-80 font-semibold text-center">Socials</h1>
      <div className="pb-6 px-6">
        <div className="w-full grid grid-cols-3 gap-2 justify-items-center py-6 px-6">
          {user.socialLink1 &&
            user.socialLink1 != "" &&
            user.socialName1 &&
            user.socialName1 != "" && (
              <a
                href={user.socialLink1}
                target="_blank"
                rel="noreferrer"
                className="flex gap-1 items-center w-full justify-center text-gray-400"
              >
                <FontAwesomeIcon icon={faLink} className="text-base" />
                <div className="truncate">{user.socialName1}</div>
              </a>
            )}

          {user.socialLink2 &&
            user.socialLink2 != "" &&
            user.socialName2 &&
            user.socialName2 != "" && (
              <a
                href={user.socialLink2}
                target="_blank"
                rel="noreferrer"
                className="flex gap-1 items-center w-full justify-center text-gray-400"
              >
                <FontAwesomeIcon icon={faLink} className="text-base" />
                <div className="truncate">{user.socialName2}</div>
              </a>
            )}

          {user.socialLink3 &&
            user.socialLink3 != "" &&
            user.socialName3 &&
            user.socialName3 != "" && (
              <a
                href={user.socialLink3}
                target="_blank"
                rel="noreferrer"
                className="flex gap-1 items-center w-full justify-center text-gray-400"
              >
                <FontAwesomeIcon icon={faLink} className="text-base" />
                <div className="truncate">{user.socialName3}</div>
              </a>
            )}
        </div>
      </div>
    </UserSection>
  );
};

export default UserSocials;
