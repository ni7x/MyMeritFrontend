import PersonalInformation from "./sections/PersonalInformation";
import Socials from "./sections/Socials";
import Achievements from "./sections/Achievements";
import Badges from "./sections/Badges";

const ProfileSettings = () => {
  return (
    <>
      <PersonalInformation />

      <Socials />

      <Achievements />

      <Badges />
    </>
  );
};

export default ProfileSettings;
