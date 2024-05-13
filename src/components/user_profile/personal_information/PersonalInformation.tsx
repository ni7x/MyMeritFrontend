import UserInfo from "../UserInfo";
import UserRewards from "../UserRewards";
import UserTasks from "../UserTasks";

const PersonalInformation = () => {
  return (
    <>
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

export default PersonalInformation;
