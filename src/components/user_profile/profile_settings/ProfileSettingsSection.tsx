const ProfileSettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className="relative mb-4 pb-8 border-b-[1px] border-solid border-gray-500">
      <div className="flex flex-row justify-between pb-6 h-14 items-center">
        <h2 className="text-base font-semibold opacity-70">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default ProfileSettingsSection;
