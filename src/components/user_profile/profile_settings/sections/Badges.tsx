import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {useAuth} from "../../../../hooks/useAuth";

const Badges = () => {
    const {userData, setUserData, isLoading} = useAuth();
    
    return (
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
    );
}

export default Badges;