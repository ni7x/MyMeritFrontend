import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../../../hooks/useAuth";

const Badges = () => {
  const { userData, isLoading } = useAuth();

  return (
    <ProfileSettingsSection title="Your badges">
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="h-8">
            {isLoading || !userData ? (
              <Skeleton height={48} />
            ) : (
              <p className="text-lg h-full flex flex-row flex-wrap items-center relative">
                {userData.badges.length > 0 &&
                  userData.badges.map((badge) => (
                    <div
                      key={badge}
                      className="group bg-indigo-500 font-semibold text-white p-2 rounded text-base relative select-none"
                      data-tooltip-target="tooltip-dark"
                    >
                      {badge.language}
                      <div className="absolute group-hover:opacity-75 opacity-0 transition-opacity duration-100 ease-linear bg-main-bg-input rounded p-2 flex justify-center items-center w-full text-center right-full top-0 text-sm mr-2">
                        {badge.description}
                      </div>
                    </div>
                  ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </ProfileSettingsSection>
  );
};

export default Badges;
