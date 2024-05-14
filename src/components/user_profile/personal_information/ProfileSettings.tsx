import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleUser,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { User } from "../../../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getUser, updateUser } from "../../../services/UserService";
import { successToast } from "../../../main";
import { z } from "zod";
import ProfileSettingsSection from "./ProfileSettingsSection";

const schema = z.object({
  username: z.string().min(5),
  description: z.string().max(300),
});

type fieldErrors = {
  username?: string[] | undefined;
  description?: string[] | undefined;
};

const ProfileSettings = () => {
  const [userData, setUserData] = useState<User>({} as User);
  const [newUserData, setNewUserData] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<fieldErrors>({});

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;

    // make base64 from file
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = await updateUser(
          userData.username,
          userData.description,
          e.target?.result as string
        );

        if (result.success) {
          setUserData({ ...userData, imageBase64: e.target?.result as string });
          setNewUserData({
            ...newUserData,
            imageBase64: e.target?.result as string,
          });
          successToast("Profile updated successfully");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSave = async () => {
    if (!newUserData.description) {
      newUserData.description = "";
    }
    const validation = schema.safeParse({
      username: newUserData.username,
      description: newUserData.description,
    });

    if (!validation.success) {
      setError(validation.error.flatten().fieldErrors);
      return;
    }

    setError({});

    const result = await updateUser(
      newUserData.username,
      newUserData.description,
      newUserData.imageBase64
    );

    if (result.success) {
      setUserData(newUserData);
      successToast("Profile updated successfully");
    }

    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUserData(data);
      setNewUserData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [updateUser]);

  return (
    <>
      <ProfileSettingsSection title="Personal information">
        <>
          {isEditing && (
            <div className="absolute top-0 right-0 flex flex-row gap-2 p-2">
              <button
                className="block rounded px-4 py-2 font-semibold bg-error-color transition-colors duration-100 ease-linear"
                onClick={() => {
                  setError({});
                  setNewUserData(userData);
                  setIsEditing(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button
                className="block rounded px-4 font-semibold bg-success-color hover:bg-success-darker-color transition-colors duration-100 ease-linear"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          )}
        </>
        <div className="grid md:grid-cols-[200px_1fr] gap-5">
          <div className="relative flex justify-center items-center w-32 h-32 overflow-hidden rounded-full">
            {isLoading ? (
              <Skeleton circle={true} width={128} height={128} />
            ) : (
              <>
                <input
                  className="hidden"
                  type="file"
                  ref={inputRef}
                  name="image"
                  onChange={handleUploadedFile}
                />

                <button
                  onClick={onUpload}
                  className="group relative hover:opacity-70 transition-opacity duration-200 flex justify-center items-center w-full h-full"
                >
                  <div className="rounded-full w-full h-full">
                    {userData.imageBase64 ? (
                      <img
                        width={128}
                        height={128}
                        src={userData.imageBase64}
                        className="w-full h-auto max-w-full rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className="w-full h-full text-6xl text-white"
                      />
                    )}
                  </div>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="opacity-0 absolute flex group-hover:opacity-100 transition-opacity duration-200 justify-center items-center text-white text-sm"
                  />
                </button>
              </>
            )}
          </div>
          <div className="grid lg:grid-cols-[300px_1fr] gap-5">
            <div className="relative flex flex-col gap-4 my-auto">
              <div className="flex flex-col pb-2">
                {isLoading ? (
                  <>
                    <Skeleton height={48} />
                  </>
                ) : (
                  <>
                    <label className="text-sm text-gray-400">Username</label>
                    <div className="h-8">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            className={`bg-main-darker h-full w-max rounded p-2 box-border ${
                              error.username
                                ? "border-error-color border-[1px] border-solid animate-shake"
                                : ""
                            }`}
                            value={newUserData.username}
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                username: e.target.value,
                              })
                            }
                          />
                          {error.username && (
                            <p className="text-sm text-error-color">
                              {error.username}
                            </p>
                          )}
                        </>
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
                      <p className="text-lg h-full font-semibold flex items-center ">
                        {userData.email}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="relative w-full h-32">
              {isEditing ? (
                <>
                  <textarea
                    className={`bg-main-darker w-full h-full rounded p-2 box-border resize-none ${
                      error.description
                        ? "border-error-color border-[1px] border-solid animate-shake"
                        : ""
                    }`}
                    value={newUserData.description}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                  {error.description && (
                    <p className="text-sm text-error-color">
                      {error.description}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <>
                      <Skeleton height={"100%"} />
                    </>
                  ) : (
                    <>
                      {userData.description &&
                      userData.description.length > 0 ? (
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
      </ProfileSettingsSection>

      <ProfileSettingsSection title="Socials">
        <div className="grid md:grid-cols-[200px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <label className="text-sm text-gray-400">Twitter</label>
            <div className="h-8">
              {isLoading ? (
                <Skeleton height={48} />
              ) : (
                <p className="text-lg h-full flex items-center opacity-50">
                  {/* {userData.twitter ? userData.twitter : "Not set"} */}
                  Not set
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm text-gray-400">Instagram</label>
            <div className="h-8">
              {isLoading ? (
                <Skeleton height={48} />
              ) : (
                <p className="text-lg h-full flex items-center opacity-50">
                  {/* {userData.instagram ? userData.instagram : "Not set"} */}
                  Not set
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm text-gray-400">Facebook</label>
            <div className="h-8">
              {isLoading ? (
                <Skeleton height={48} />
              ) : (
                <p className="text-lg h-full flex items-center opacity-50">
                  {/* {userData.facebook ? userData.facebook : "Not set"} */}
                  Not set
                </p>
              )}
            </div>
          </div>
        </div>
      </ProfileSettingsSection>

      <ProfileSettingsSection title="Your achievements">
        <div className="grid md:grid-cols-[200px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <div className="h-8">
              {isLoading ? (
                <Skeleton height={48} />
              ) : (
                <p className="text-lg h-full flex items-center opacity-50">
                  {/* {userData.badges.length > 0
                    ? userData.badges.join(", ")
                    : "No badges"} */}
                  No achievements
                </p>
              )}
            </div>
          </div>
        </div>
      </ProfileSettingsSection>

      <ProfileSettingsSection title="Your badges">
        <div className="grid md:grid-cols-[200px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <div className="h-8">
              {isLoading ? (
                <Skeleton height={48} />
              ) : (
                <p className="text-lg h-full flex items-center opacity-50">
                  {/* {userData.badges.length > 0
                    ? userData.badges.join(", ")
                    : "No badges"} */}
                  No badges
                </p>
              )}
            </div>
          </div>
        </div>
      </ProfileSettingsSection>
    </>
  );
};

export default ProfileSettings;
