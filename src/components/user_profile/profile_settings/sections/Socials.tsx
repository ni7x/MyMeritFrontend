import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { z } from "zod";
import { successToast } from "../../../../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { User } from "@types";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TextSub from "../TextSub";

type UserSocials = {
  socialName1?: string;
  socialLink1?: string;
  socialName2?: string;
  socialLink2?: string;
  socialName3?: string;
  socialLink3?: string;
};

type FieldErrors = {
  socialName1?: string[];
  socialLink1?: string[];
  socialName2?: string[];
  socialLink2?: string[];
  socialName3?: string[];
  socialLink3?: string[];
};

const schema = z.object({
  socialName1: z.string().max(255).nullable().optional(),
  socialLink1: z.string().max(255).nullable().optional(),
  socialName2: z.string().max(255).nullable().optional(),
  socialLink2: z.string().max(255).nullable().optional(),
  socialName3: z.string().max(255).nullable().optional(),
  socialLink3: z.string().max(255).nullable().optional(),
});

const getSocials = (userData: User): UserSocials => {
  const socials = {} as UserSocials;
  for (let i = 1; i <= 3; i++) {
    const socialName = `socialName${i}` as keyof UserSocials;
    const socialLink = `socialLink${i}` as keyof UserSocials;

    socials[socialName] = userData[socialName];
    socials[socialLink] = userData[socialLink];
  }

  return socials;
};

const Socials = () => {
  const [newSocials, setNewSocials] = useState<UserSocials>({} as UserSocials);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<FieldErrors>({});

  const { userData, setUserData, isLoading, updateUser } = useAuth();

  const handleSave = async () => {
    const validation = schema.safeParse({
      socialName1: newSocials.socialName1,
      socialLink1: newSocials.socialLink1,
      socialName2: newSocials.socialName2,
      socialLink2: newSocials.socialLink2,
      socialName3: newSocials.socialName3,
      socialLink3: newSocials.socialLink3,
    });

    if (!validation.success) {
      console.log(validation.error.flatten().fieldErrors);
      setError(validation.error.flatten().fieldErrors);
      return;
    }

    setError({});

    const result = await updateUser(newSocials);

    if (result.success) {
      setUserData({ ...userData, ...newSocials });
      successToast("Profile updated successfully");
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (userData) {
      setNewSocials(getSocials(userData));
    }
  }, [userData]);

  return (
    <ProfileSettingsSection title="Socials">
      <>
        {isEditing && userData && (
          <div className="absolute top-0 right-0 flex flex-row gap-2 p-2">
            <button
              className="block rounded px-4 py-2 font-semibold bg-error-color transition-colors duration-100 ease-linear"
              onClick={() => {
                setError({});
                setNewSocials(getSocials(userData));
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400">Social Name {i}</label>
              <div className="h-8">
                {isLoading || !userData ? (
                  <Skeleton height={48} />
                ) : isEditing ? (
                  <>
                    <input
                      type="text"
                      className={`bg-main-darker h-full rounded p-2 box-border w-full ${
                        error[
                          ("socialName" + i.toString()) as keyof FieldErrors
                        ]
                          ? "border-error-color border-[1px] border-solid animate-shake"
                          : ""
                      }`}
                      value={
                        newSocials[
                          ("socialName" + i.toString()) as keyof UserSocials
                        ]
                      }
                      onChange={(e) => {
                        const socialUpdateObject = {} as UserSocials;
                        socialUpdateObject[
                          ("socialName" + i.toString()) as keyof UserSocials
                        ] = e.target.value;
                        setNewSocials({
                          ...newSocials,
                          ...socialUpdateObject,
                        });
                      }}
                    />
                    {error[
                      ("socialName" + i.toString()) as keyof FieldErrors
                    ] && (
                      <p className="text-sm text-error-color">
                        {
                          error[
                            ("socialName" + i.toString()) as keyof FieldErrors
                          ]
                        }
                      </p>
                    )}
                  </>
                ) : (
                  <p
                    onClick={() => setIsEditing(true)}
                    className="text-sm md:text-base h-full w-full break-words break-all whitespace-normal overflow-auto font-semibold flex items-center group cursor-pointer"
                  >
                    {userData[
                      ("socialName" + i.toString()) as keyof FieldErrors
                    ] ? (
                      <TextSub
                        text={
                          userData[
                            ("socialName" + i.toString()) as keyof FieldErrors
                          ]
                        }
                      />
                    ) : (
                      "Add social"
                    )}
                    <FontAwesomeIcon
                      className="ml-2 text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-100 ease-linear"
                      icon={faPenToSquare}
                    />
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Social Link {i}</label>
              <div className="h-8">
                {isLoading || !userData ? (
                  <Skeleton height={48} />
                ) : isEditing ? (
                  <>
                    <input
                      type="text"
                      className={`bg-main-darker h-full w-full rounded p-2 box-border ${
                        error[
                          ("socialLink" + i.toString()) as keyof FieldErrors
                        ]
                          ? "border-error-color border-[1px] border-solid animate-shake"
                          : ""
                      }`}
                      value={
                        newSocials[
                          ("socialLink" + i.toString()) as keyof UserSocials
                        ]
                      }
                      onChange={(e) => {
                        const socialUpdateObject = {} as UserSocials;
                        socialUpdateObject[
                          ("socialLink" + i.toString()) as keyof UserSocials
                        ] = e.target.value;
                        setNewSocials({
                          ...newSocials,
                          ...socialUpdateObject,
                        });
                      }}
                    />
                    {error[
                      ("socialLink" + i.toString()) as keyof FieldErrors
                    ] && (
                      <p className="text-sm text-error-color">
                        {
                          error[
                            ("socialLink" + i.toString()) as keyof FieldErrors
                          ]
                        }
                      </p>
                    )}
                  </>
                ) : (
                  <p
                    onClick={() => setIsEditing(true)}
                    className="text-sm md:text-base h-full font-semibold flex items-center group cursor-pointer"
                  >
                    {userData[
                      ("socialLink" + i.toString()) as keyof FieldErrors
                    ] ? (
                      <TextSub
                        text={
                          userData[
                            ("socialLink" + i.toString()) as keyof FieldErrors
                          ]
                        }
                      />
                    ) : (
                      "Add social link"
                    )}
                    <FontAwesomeIcon
                      className="ml-2 text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-100 ease-linear"
                      icon={faPenToSquare}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSettingsSection>
  );
};

export default Socials;
