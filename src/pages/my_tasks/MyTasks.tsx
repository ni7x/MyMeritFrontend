import { useEffect, useState } from "react";
import {
  getUserBookmarks,
  getUserSolutions,
} from "../../services/JobOfferService";
import TaskList from "../../components/my_tasks/TaskList";
import FilterPanel from "../../components/my_tasks/FilterPanel";
import { useAuth } from "../../hooks/useAuth";
import SolutionPreview from "../../models/TaskPreview";
import BookmarkList from "../../components/my_tasks/BookmarkList";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";

const MyTasks = () => {
  const [solutions, setSolutions] = useState<SolutionPreview[]>([]);
  const [filteredSolutions, setFilteredSolutions] = useState<SolutionPreview[]>(
    []
  );
  const [bookmarkedJobs, setBookmarkedJobs] = useState<JobOfferListedDTO[]>([]);
  const [isBookmarkedTab, setIsBookmarkedTab] = useState(true);
  const [isSolutionTab, setIsSolutionTab] = useState(true);

  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const response = await getUserSolutions(accessToken);
          const bookmarks = await getUserBookmarks(accessToken);
          setBookmarkedJobs(bookmarks);
          setSolutions(response);
          setFilteredSolutions(response);
        } else {
          console.log("No token provided");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  const removeFromBookmarkList = (jobId: string) => {
    const updatedBookmarkedJobs = bookmarkedJobs.filter(
      (job) => job.id !== jobId
    );
    setBookmarkedJobs(updatedBookmarkedJobs);
  };

  console.log(isBookmarkedTab);

  return (
    <>
      <div className="flex flex-col md:grid grid-cols-[220px_1fr]  gap-4">
        {solutions && bookmarkedJobs && (
          <>
            <div>
              <FilterPanel
                tasks={solutions}
                setFilteredTasks={setFilteredSolutions}
                bookmarkedJobs={bookmarkedJobs}
                setIsBookmarkedTab={setIsBookmarkedTab}
                setIsSolutionTab={setIsSolutionTab}
              />
            </div>
            <div className="list-none flex flex-col gap-4">
              {isSolutionTab ? (
                <TaskList tasks={filteredSolutions} />
              ) : (
                <BookmarkList
                  bookmarks={bookmarkedJobs}
                  removeFromBookmarkList={removeFromBookmarkList}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyTasks;
