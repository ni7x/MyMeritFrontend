import UserHeader from "./UserHeader";
import UserBody from "./UserBody";
import UserSection from "./UserSection";
import User from "../../types/User";

type Social = {
  id_social_user: string;
  social_media_name: string;
  social_media_link: string;
  id_user: string;
  id_icon: string;
  url: string;
};

const UserInfo = ({
  user,
  socials,
}: {
  user: User;
  socials?: Social[] | undefined;
}) => {
  return (
    <UserSection>
      <UserHeader
        imageSmall={user.imageUrl}
        // imageBig={user.imageBig}
        username={user.username}
        email={user.email}
        role={user.role}
        points={user.points}
      />
      <UserBody description={user.description} />
    </UserSection>
  );
};

export default UserInfo;
