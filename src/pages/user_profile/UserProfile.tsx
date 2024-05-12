import UserInfo from "../../components/user_profile/UserInfo";
import UserRewards from "../../components/user_profile/UserRewards";
import UserTasks from "../../components/user_profile/UserTasks";

const UserProfile = () => {
  return (
    <>
      {/* <header className="pb-2">
        <h1 className="text-2xl">Your account</h1>
      </header> */}

      <div className="grid md:grid-cols-2 gap-8 mb-8 h-full">
        <UserInfo />
        <div className="grid md:grid-row-2 gap-4">
          <UserTasks />
          <UserRewards />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
