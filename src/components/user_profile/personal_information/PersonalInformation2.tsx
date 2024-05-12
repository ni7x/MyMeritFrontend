import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../hooks/useAuth";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getUser, updateUser } from "../../../services/UserService";
import { successToast } from "../../../main";

const PersonalInformation2 = () => {
  const [newData, setNewData] = useState<User>({} as User);
  const [userData, setUserData] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  //   const userData = undefined;

  const handleSave = async () => {
    setIsEditing(false);
    const result = await updateUser(
      userData.username,
      userData.description,
      userData.imageBase64
    );

    if (result.success) {
      successToast("Profile updated successfully");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUserData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [updateUser]);

  return (
    <>
      <div className="grid md:grid-cols-[200px_1fr] gap-5 pb-4">
        <div className="relative flex justify-center items-center">
          {isLoading ? (
            <Skeleton circle={true} width={128} height={128} />
          ) : (
            <img
              src={userData.imageBase64}
              alt="avatar"
              className="w-32 h-32 rounded-full"
            />
          )}
        </div>
        <div className="grid md:grid-cols-[400px_1fr] gap-5">
          <div className="relative flex flex-col gap-4 my-auto">
            <div className="flex flex-col">
              {isLoading ? (
                <>
                  <Skeleton height={48} />
                </>
              ) : (
                <>
                  <label className="text-sm text-gray-400">Username</label>
                  <div className="h-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="bg-main-darker h-full w-max rounded p-2 box-border"
                        value={userData.username}
                        onChange={(e) =>
                          setUserData({ ...userData, username: e.target.value })
                        }
                      />
                    ) : (
                      <p
                        onClick={() => setIsEditing(true)}
                        className="text-lg h-full font-semibold flex items-center group cursor-pointer"
                      >
                        {userData.username}
                        <FontAwesomeIcon
                          className="ml-2 text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-100 ease-linear"
                          icon={faPenToSquare}
                        />
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col">
              {isLoading ? (
                <>
                  <Skeleton height={48} />
                </>
              ) : (
                <>
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="h-8">
                    {/* {isEditing ? (
                      <input
                        type="text"
                        className="bg-main-darker h-full w-max rounded p-2 box-border"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    ) : ( */}
                    <p
                      // onClick={() => setIsEditing(true)}
                      className="text-lg h-full font-semibold flex items-center "
                    >
                      {userData.email}
                      {/* <FontAwesomeIcon
                          className="ml-2 text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-100 ease-linear"
                          icon={faPenToSquare}
                        /> */}
                    </p>
                    {/* )} */}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="relative h-32">
            {isEditing ? (
              <textarea
                className="bg-main-darker w-full h-full rounded p-2 box-border resize-none"
                value={userData.description}
                onChange={(e) =>
                  setUserData({ ...userData, description: e.target.value })
                }
              ></textarea>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <Skeleton height={"100%"} />
                  </>
                ) : (
                  <>
                    {userData.description.length > 0 ? (
                      <div className="flex flex-col h-full gap-4">
                        <label className="text-sm text-gray-400">
                          Description
                        </label>
                        <p
                          onClick={() => setIsEditing(true)}
                          className="text-lg font-semibold group flex items-center cursor-pointer"
                        >
                          {userData.description}
                          <FontAwesomeIcon
                            className="ml-2 text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-100 ease-linear"
                            icon={faPenToSquare}
                          />
                        </p>
                      </div>
                    ) : (
                      <div className="flex w-full h-full bg-dotted rounded-2xl relative">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="absolute top-0 left-0 w-full h-full bg-transparent text-gray-400 text-sm font-semibold"
                        >
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faPenToSquare}
                          />
                          Add bio
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <>
        {isEditing && (
          <button
            className="block ml-auto rounded p-3 font-semibold bg-success-color hover:bg-success-darker-color transition-colors duration-100 ease-linear"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </>
    </>
  );
};

export default PersonalInformation2;
