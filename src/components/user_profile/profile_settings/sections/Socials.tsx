import ProfileSettingsSection from "../ProfileSettingsSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {useAuth} from "../../../../hooks/useAuth";

const Socials = () => {
    const {userData, setUserData, isLoading} = useAuth();

    return (
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
    );
}

export default Socials;