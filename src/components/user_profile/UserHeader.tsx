const UserHeader = ({
  imageSmall,
  imageBig,
  username,
  email,
  role,
}: {
  imageSmall: string;
  imageBig: string;
  username: string;
  email: string;
  role: string;
}) => {
  return (
    <>
      <div className="pb-[3.5rem]">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-main-darker"></div>
          <div className="absolute top-0 left-0 p-4">
            <div
              className={`px-2 py-1 opacity-80 rounded-lg text-sm lowercase font-semibold text-white ${
                role === "USER" && "bg-green-700"
              } ${role === "COMPANY" && "bg-blue-500"}`}
            >
              {role}
            </div>
          </div>
          <div className="h-40">
            <img
              src={imageBig}
              alt="background"
              className="h-full w-full object-cover rounded-t-xl"
            />
          </div>
          <div className="absolute w-full flex justify-center align-center bottom-[-3.5rem]">
            <img
              src={imageSmall}
              alt="avatar"
              className="h-28 w-28 rounded-full border-2 border-main-darker border-solid object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <p className="text-2xl text-white font-semibold">{username}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </>
  );
};

export default UserHeader;
