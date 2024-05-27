const Button = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className={`px-7 py-2.5 rounded text-sm font-medium w-full lg:w-auto ${
        isActive
          ? "bg-emerald-450 text-white"
          : "bg-secondary-bg-color text-task-lighter"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
