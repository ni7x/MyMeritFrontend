import UserHeader from "./UserHeader";
import UserBody from "./UserBody";
import UserSection from "./UserSection";
import EditProfileForm from "./form/EditProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
// import { Skeleton } from "@mui/material";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserInfo = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { setUserData, userData } = useAuth();

  if (userData == undefined) {
    return (
      <Skeleton borderRadius="0.75rem" height="100%" />
    )
  }

  return (
    <UserSection>
      <UserHeader
        imageBase64={userData.imageBase64}
        username={userData.username}
        email={userData.email}
        role={userData.role}
        points={userData.credits}
      />

      <UserBody
        description={userData.description}
        onEdit={() => setShowForm(true)}
      />

      <>
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
              username={userData.username}
              description={userData.description}
              imageBase64={userData.imageBase64}
              closeForm={() => setShowForm(false)}
              setUserData={setUserData}
            />
          </div>
        </div>
      </>
    </UserSection>
  );
};

export default UserInfo;