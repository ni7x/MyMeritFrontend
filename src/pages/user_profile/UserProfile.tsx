import UserProfileSidebar from "../../components/user_profile/UserProfileSidebar";
import PersonalInformation2 from "../../components/user_profile/personal_information/PersonalInformation2";
import UserPurchases from "../../components/user_profile/purchases/UserPurchases";
import UserTasks from "../../components/user_profile/UserTasks";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const { pathname } = useLocation();
  let page;

  switch (pathname) {
    case "/profile":
      page = <PersonalInformation2 />;
      break;
    case "/profile/purchases":
      page = <UserPurchases />;
      break;
    case "/profile/tasks":
      page = <UserTasks />;
      break;
    default:
      page = <PersonalInformation2 />;
  }

  return (
    <>
      <div className="pr-60 4xl:pr-0">{page}</div>
      <UserProfileSidebar />
    </>
  );
};

export default UserProfile;
