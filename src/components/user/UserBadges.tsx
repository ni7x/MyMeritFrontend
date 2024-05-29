import { User } from "@types";
import Badge from "../user_profile/profile_settings/sections/Badge";
import UserSection from "./UserSection";

const UserBadges = ({ user }: { user: User }) => {
  if (!user.badges || user.badges.length === 0) return null;

  return (
    <UserSection>
      <h1 className="text-2xl opacity-80 font-semibold text-center">Badges</h1>
      <div className="grid grid-cols-7 p-4 gap-2">
        {user.badges.slice(0, 6).map((badge, index) => (
          <Badge badge={badge} key={index} />
        ))}
        <>
          {user.badges.length > 6 && (
            <div className="flex flex-col gap-2 justify-start items-center rounded w-full h-full">
              <div className="rounded bg-black bg-opacity-20 p-2 box-content flex justify-center items-center">
                <p className="text-xl font-semibold opacity-70">
                  +{user.badges.length - 6}
                </p>
              </div>
            </div>
          )}
        </>
      </div>
    </UserSection>
  );
};

export default UserBadges;
