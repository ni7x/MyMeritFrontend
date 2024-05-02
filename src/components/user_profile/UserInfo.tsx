import UserHeader from "./UserHeader";
import UserBody from "./UserBody";
import UserSection from "./UserSection";
import User from "../../types/User";
import Social from "../../types/Social";
import EditProfileForm from "./form/EditProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserSocials } from "../../services/UserService";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const UserInfo = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUser().then((user) => {
      if (user === null) {
        navigate("/login");
        return;
      }
      setUser(user);
      setIsLoading(false);
    });
  }, [showForm]);

  return (
    <UserSection>
      <>
        {user != null ? (
          <>
            <UserHeader
              imageBase64={user.imageBase64}
              username={user.username}
              email={user.email}
              role={user.role}
              points={user.credits}
            />

            <UserBody
              description={user.description}
              onEdit={() => setShowForm(true)}
            />
          </>
        ) : (
          <Skeleton count={15} />
        )}
      </>

      <>
        {user != null && (
          <div
            className={`fixed ${
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
                imageBase64={user.imageBase64}
                closeForm={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </>
    </UserSection>
  );
};

export default UserInfo;
