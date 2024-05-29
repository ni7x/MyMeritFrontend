import { Achievement as AchievementType } from "@types";

const Achievement = ({ achievement }: { achievement: AchievementType }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-2">
      <div className="rounded-full w-8 h-8 bg-white p-2 box-content">
        <img
          className="w-full object-cover"
          src={achievement.base64image}
          alt="achievement"
        />
      </div>
      <p className="text-gray-400 text-center text-xs md:text-base">
        {achievement.description}
      </p>
    </div>
  );
};

export default Achievement;
