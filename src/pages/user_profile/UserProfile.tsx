import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserSocials } from "../../services/UserService";
import UserInfo from "../../components/user_profile/UserInfo";
import UserRewards from "../../components/user_profile/UserRewards";
import UserTasks from "../../components/user_profile/UserTasks";
import SecondWrapper from "../../components/SecondWrapper";
import User from "../../types/User";
import EditProfileForm from "../../components/user_profile/form/EditProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
  const [showForm, setShowForm] = useState<Boolean>(false);

  useEffect(() => {
    getUser().then((user) => {
      if (user === null) {
        navigate("/login");
        return;
      }
      setUser(user);
      // setSocials(getUserSocials(user.id));
    });
  }, [showForm]);

  if (user === null) return <p>User not found</p>;
  return (
    <SecondWrapper>
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserInfo user={user} onEdit={() => setShowForm(true)} />
          <UserRewards user={user} />
        </div>
        <UserTasks />
      </div>
      <div
        className={`absolute ${
          !showForm && `opacity-0 invisible`
        } w-full h-full top-0 left-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center transition-opacity duration-300 ${
          showForm && `opacity-100 visible`
        }`}
      >
        <div
          className={`p-8 scale-0 relative bg-main-bg-color rounded-lg z-[1001] ${
            showForm && `scale-100`
          } transition-transform duration-300`}
        >
          <button
            className="absolute top-0 right-0 p-4 text-lg"
            onClick={() => setShowForm(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <EditProfileForm
            username={user.username}
            description={user.description}
            imageUrl={user.imageUrl}
            closeForm={() => setShowForm(false)}
          />
        </div>
      </div>
    </SecondWrapper>
  );
};

export default UserProfile;
