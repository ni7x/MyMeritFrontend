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
  onEdit,
}: {
  user: User;
  socials?: Social[] | undefined;
  onEdit: () => void;
}) => {
  return (
    <UserSection>
      <UserHeader
        imageBase64={user.imageBase64}
        username={user.username}
        email={user.email}
        role={user.role}
        points={user.credits}
      />
      <UserBody description={user.description} onEdit={onEdit} />
    </UserSection>
  );
};

export default UserInfo;
