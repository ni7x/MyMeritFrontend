import { Badge as BadgeType } from "../../../../types";

const Badge = ({ badge }: { badge: BadgeType }) => {
  return (
    <div
      className="group bg-indigo-500 font-semibold text-white p-2 rounded text-base relative select-none text-center flex justify-center items-center"
      data-tooltip-target="tooltip-dark"
    >
      {badge.language}
      <div className="absolute group-hover:opacity-100 opacity-0 transition-opacity duration-100 ease-linear bg-main-bg-input rounded p-2 flex justify-center items-center w-24 text-center left-0 top-full mt-2 text-sm mr-2">
        {badge.description}
      </div>
    </div>
  );
};

export default Badge;
