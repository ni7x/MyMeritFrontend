import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserSocials } from "../../services/UserService";
import UserInfo from "../../components/user_profile/UserInfo";
import UserRewards from "../../components/user_profile/UserRewards";
import UserTasks from "../../components/user_profile/UserTasks";
import SecondWrapper from "../../components/SecondWrapper";
import User from "../../types/User";

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
  const [user, setUser] = useState<User | null>(null);
  const [socials, setSocials] = useState<Social[] | null>(null);

  useEffect(() => {
    getUser().then((user) => {
      if (user === null) {
        navigate("/login");
        return;
      }
      setUser(user);
      // setSocials(getUserSocials(user.id));
    });
  }, []);

  if (user === null) return <p>User not found</p>;

  return (
    <SecondWrapper>
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserInfo user={user} />
          <UserRewards user={user} />
        </div>
        <UserTasks />
      </div>
    </SecondWrapper>
  );
};

export default UserProfile;
