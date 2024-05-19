import React from "react";
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";
import Bookmark from "./Bookmark";
import NoItemsFound from "../NoItemsFound";

const BookmarkList: React.FC<{
  bookmarks: JobOfferListedDTO[];
  removeFromBookmarkList: (id: string) => void;
}> = ({ bookmarks, removeFromBookmarkList }) => {
  console.log(bookmarks);
  return (
    <ul className="flex flex-col p-0 m-0 list-none gap-4">
      {bookmarks.map((bookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmarkedJob={bookmark}
          removeFromBookmarkList={removeFromBookmarkList}
        />
      ))}
    </ul>
  );
};

export default BookmarkList;
