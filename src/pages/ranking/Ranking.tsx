import { useEffect, useState } from "react";
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import Button from "../../components/ranking/Button";
import TopUsers from "../../components/ranking/TopUsers";
import UserList from "../../components/ranking/UserList";
import { getRanking } from "../../services/UserService";
import NoItemsFound from "../../components/NoItemsFound";

const Ranking = () => {
  const [users, setUsers] = useState<RankingUserDTO[]>([]);
  const [activeButton, setActiveButton] = useState<"year" | "month" | "week">(
    "week"
  );

  useEffect(() => {
    getRanking(activeButton).then((r) => setUsers(r));
  }, [activeButton]);

  const handleButtonClick = (button: "year" | "month" | "week") => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">Leaderboard</h2>
      <div className="flex gap-4 flex-wrap px-4">
        <Button
          label="TOP THIS YEAR"
          isActive={activeButton === "year"}
          onClick={() => handleButtonClick("year")}
        />
        <Button
          label="TOP THIS MONTH"
          isActive={activeButton === "month"}
          onClick={() => handleButtonClick("month")}
        />
        <Button
          label="TOP THIS WEEK"
          isActive={activeButton === "week"}
          onClick={() => handleButtonClick("week")}
        />
      </div>
      <div className="lg:w-[80%] m-auto">
        {users && users.length > 0 ? (
          <>
            <div className="hidden lg:flex  flex-col gap-4">
              <TopUsers users={users.slice(0, 3)} />
              {users.length > 3 && <UserList users={users.slice(3)} />}
            </div>
            <div className="flex lg:hidden w-full">
              <UserList users={users} />
            </div>
          </>
        ) : (
          <div className="mt-[7rem]">
            <NoItemsFound itemName="users" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
