import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../../../hooks/useAuth";

const Achievements = () => {
  const { userData, isLoading } = useAuth();

  return (
    <ProfileSettingsSection title="Your achievements">
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="h-8">
            {isLoading || !userData ? (
              <Skeleton height={48} />
            ) : (
              <p className="text-lg h-full flex items-center opacity-50">
                {/* {userData.achievements.length > 0 ? (
                  userData.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="group bg-indigo-500 font-semibold text-white p-2 rounded text-base relative select-none"
                      data-tooltip-target="tooltip-dark"
                    >
                      {achievement}
                      <div className="absolute group-hover:opacity-75 opacity-0 transition-opacity duration-100 ease-linear bg-main-bg-input rounded p-2 flex justify-center items-center w-full text-center right-full top-0 text-sm mr-2">
                        {achievement.description}
                      </div>
                    </div>
                  ))
                ) : ( */}
                <span>No achievements yet</span>
                {/* )} */}
              </p>
            )}
          </div>
        </div>
      </div>
    </ProfileSettingsSection>
  );
};

export default Achievements;
