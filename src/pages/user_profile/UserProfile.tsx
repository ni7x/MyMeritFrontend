import UserProfileSidebar from "../../components/user_profile/UserProfileSidebar";
import ProfileSettings from "../../components/user_profile/profile_settings/ProfileSettings";
import UserPurchases from "../../components/user_profile/purchases/UserPurchases";
import MyTasks from "../my_tasks/MyTasks";
import { useLocation } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const UserProfile = () => {
  const { pathname } = useLocation();
  const {isAuthenticatedCompany}  = useAuth();
  let page;

  switch (pathname) {
    case "/profile":
      page = <ProfileSettings />;
      break;
    case "/profile/purchases":
      page = <UserPurchases />;
      break;
    case "/profile/tasks":
      if(isAuthenticatedCompany()){
        page = <></>;
      }else{
        page = <MyTasks />;
      }

      break;
    default:
      page = <ProfileSettings />;
  }

  return (
    <>
      <div className="pr-16 sm:pr-60 4xl:pr-0">{page}</div>
      <UserProfileSidebar />
    </>
  );
};

export default UserProfile;
