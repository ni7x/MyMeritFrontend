import UserSection from "./UserSection";

const UserTasks = () => {
  return (
    <UserSection className="h-32">
      <div className="px-12 py-4">
        <div className="w-full justify-start align-center flex flex-row gap-4 py-2">
          <div className="flex items-center">
            <p className="text-2xl">Tasks</p>
          </div>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-500 py-2">
            You don't have any completed tasks yet.
          </p>
        </div>
      </div>
    </UserSection>
  );
};

export default UserTasks;
