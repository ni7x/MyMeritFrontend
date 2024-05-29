import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../../../hooks/useAuth";
import Badge from "./Badge";

const Badges = () => {
  const { userData, isLoading } = useAuth();

  return (
    <ProfileSettingsSection title="Your badges">
      <div className="h-12">
        {isLoading || !userData ? (
          <Skeleton height={48} />
        ) : (
          <p className="text-lg h-full gap-2 flex flex-row flex-wrap items-center relative overflow-hidden">
            {userData.badges.length > 0 &&
              userData.badges.map((badge, index) => (
                <Badge badge={badge} key={index} />
              ))}

            {(userData.badges.length < 1 || !userData.badges) && (
              <span className="opacity-50">No badges yet</span>
            )}
          </p>
        )}
      </div>
    </ProfileSettingsSection>
  );
};

export default Badges;
