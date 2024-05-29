import UserProfileSidebar from "../../components/user_profile/UserProfileSidebar";
import ProfileSettings from "../../components/user_profile/profile_settings/ProfileSettings";
import UserPurchases from "../../components/user_profile/purchases/UserPurchases";
import MyTasks from "../my_tasks/MyTasks";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserProfile = () => {
  const { pathname } = useLocation();
  const { isAuthenticatedCompany } = useAuth();
  let page;

  switch (pathname) {
    case "/me":
      page = <ProfileSettings />;
      break;
    case "/me/purchases":
      page = <UserPurchases />;
      break;
    case "/me/tasks":
      if (isAuthenticatedCompany()) {
        page = <></>;
      } else {
        page = <MyTasks />;
      }

      break;
    default:
      page = <ProfileSettings />;
  }

  return (
    <>
      <div className="pr-16 sm:pr-60 4xl:pr-16">{page}</div>
      <UserProfileSidebar />
    </>
  );
};

export default UserProfile;
