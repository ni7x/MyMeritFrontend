import { User } from "@types";
import UserSection from "./UserSection";

const UserDescription = ({ user }: { user: User }) => {
  if (
    !user.description ||
    user.description == null ||
    user.description.length == 0
  )
    return null;
  return (
    <UserSection>
      <h1 className="text-2xl opacity-80 font-semibold text-center">About</h1>
      <p className="text-base text-gray-400 pb-6 px-6 text-center">
        {user.description}
      </p>
    </UserSection>
  );
};

export default UserDescription;
