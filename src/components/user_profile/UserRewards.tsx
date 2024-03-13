import UserSection from "./UserSection";

type User = {
  id_user: string;
  username: string;
  email: string;
  points: number;
  role: string;
  description: string;
  image_small: string;
  image_big: string;
};

const UserRewards = ({ user }: { user: User }) => {
  return (
    <UserSection>
      <div className="px-12 py-4">
        <div className="w-full flex flex-wrap items-center justify-between py-2">
          <p className="text-2xl">Rewards</p>
          <p className="text-md px-2 py-1 rounded bg-white text-main-darker">
            Your points: {user.points}
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-500 py-2">
            Your rewards history is empty.
          </p>
        </div>
      </div>
    </UserSection>
  );
};

export default UserRewards;
