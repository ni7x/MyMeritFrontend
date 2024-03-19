import UserHeader from "./UserHeader";
import UserBody from "./UserBody";
import UserSection from "./UserSection";

type User = {
  id_user: string;
  username: string;
  email: string;
  points: number;
  role: string;
  description: string;
  image_small: string;
  image_big: string;
};

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
  socials: Social[] | null;
}) => {
  return (
    <UserSection>
      <UserHeader
        imageSmall={user.image_small}
        imageBig={user.image_big}
        username={user.username}
        email={user.email}
        role={user.role}
      />
      <UserBody description={user.description} socials={socials} />
    </UserSection>
  );
};

export default UserInfo;
