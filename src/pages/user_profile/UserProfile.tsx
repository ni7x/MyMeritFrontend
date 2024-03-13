import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, getUserSocials } from "../../services/UserService";
import UserInfo from "../../components/user_profile/UserInfo";
import UserRewards from "../../components/user_profile/UserRewards";
import UserTasks from "../../components/user_profile/UserTasks";
import SecondWrapper from "../../components/SecondWrapper";

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

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [socials, setSocials] = useState<Social[] | null>(null);

  if (!id) return <p>User not found</p>;

  useEffect(() => {
    setUser(getUserById(id));
    setSocials(getUserSocials(id));
  }, []);

  if (user === null) return <p>User not found</p>;

  return (
    <SecondWrapper>
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserInfo user={user} socials={socials} />
          <UserRewards user={user} />
        </div>
        <UserTasks />
      </div>
    </SecondWrapper>
  );
};

export default UserProfile;
