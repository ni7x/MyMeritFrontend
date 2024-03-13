import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

type Social = {
  id_social_user: string;
  social_media_name: string;
  social_media_link: string;
  id_user: string;
  id_icon: string;
  url: string;
};

const DESCRIPTION_LENGTH = 200;

const UserBody = ({
  description,
  socials,
}: {
  description: string;
  socials: Social[] | null;
}) => {
  const getSocialIcon = (id_icon: string) => {
    switch (id_icon) {
      case "1":
        return faFacebook;
      case "2":
        return faGithub;
      case "3":
        return faLinkedin;
      default:
        return faFacebook;
    }
  };

  return (
    <div className="px-12 py-4">
      <div className="w-full justify-start align-center flex flex-row gap-4 py-2">
        {socials !== null &&
          socials.map((social: Social) => {
            return (
              <a
                href={social.social_media_link}
                target="_blank"
                rel="noreferrer"
                key={social.id_social_user}
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={getSocialIcon(social.id_icon)}
                  className="text-2xl"
                />
              </a>
            );
          })}
      </div>
      <p className="text-sm text-gray-400 py-2">
        {description.substring(0, DESCRIPTION_LENGTH)}{" "}
        {description.length >= DESCRIPTION_LENGTH && "..."}
      </p>
      <div className="absolute top-0 right-0 p-4">
        <button className="text-md leading-none opacity-70 bg-main-darker p-2 rounded-lg text-gray-200 hover:text-main-darker hover:bg-white hover:opacity-100 transition-all">
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </div>
  );
};

export default UserBody;
