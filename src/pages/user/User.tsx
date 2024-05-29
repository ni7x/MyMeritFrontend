import UserHeader from "../../components/user/UserHeader";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getUserFromId } from "../../services/UserService";
import { User as UserType } from "../../types";
import UserSocials from "../../components/user/UserSocials";
import UserDescription from "../../components/user/UserDescription";
import UserAchievements from "../../components/user/UserAchievements";
import UserBadges from "../../components/user/UserBadges";

const User = () => {
  const [userData, setUserData] = useState<UserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const Navigate = useNavigate();
  if (id == undefined) {
    Navigate("/404");
    return;
  }

  useEffect(() => {
    getUserFromId(id)
      .then((data) => {
        if (!data.user) {
          Navigate("/404");
        }

        setUserData(data.user);
      })
      .catch((error) => {
        console.error(error);
        Navigate("/404");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (userData == undefined || isLoading) {
    return (
      <div className="max-w-3xl m-auto">
        <Skeleton borderRadius="0.75rem" className="!h-[calc(100vh-200px)]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl m-auto flex flex-col gap-4">
      <UserHeader user={userData} />
      <UserDescription user={userData} />
      <UserSocials user={userData} />
      <UserAchievements user={userData} />
      <UserBadges user={userData} />
    </div>
  );
};

export default User;
