import { User, Achievement as AchievementType } from "@types";
import UserSection from "./UserSection";
import Achievement from "../user_profile/profile_settings/sections/Achievement";

const UserAchievements = ({ user }: { user: User }) => {
  if (!user.achievements || user.achievements.length === 0) return null;

  return (
    <UserSection>
      <h1 className="text-2xl opacity-80 font-semibold text-center">
        Achievements
      </h1>

      <div className="grid grid-cols-4 p-4">
        {user.achievements
          .slice(0, 3)
          .map((achievement: AchievementType, index: number) => (
            <Achievement achievement={achievement} key={index} />
          ))}
        <>
          {user.achievements.length > 3 && (
            <div className="flex flex-col gap-2 justify-start items-center p-2">
              <div className="rounded-full w-8 h-8 bg-black bg-opacity-20 p-2 box-content flex justify-center items-center">
                <p className="text-xl font-semibold opacity-70">
                  +{user.achievements.length - 3}
                </p>
              </div>
            </div>
          )}
        </>
      </div>
    </UserSection>
  );
};

export default UserAchievements;
