const FilterButton = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: JSX.Element | JSX.Element[];
  className: string;
  onClick: () => void;
}) => {
  return (
    <button
        className={`bg-none border-b-[1px] border-main-border border-solid w-full text-main-front-color p-4 flex justify-between gap-2 cursor-pointer text-sm ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default FilterButton;
