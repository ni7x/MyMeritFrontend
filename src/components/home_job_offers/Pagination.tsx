import React from "react";
import { QueryParams } from "../../models/QueryParams";

const Pagination: React.FC<{
  maxPages: number;
  queryParams: QueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}> = ({ maxPages, queryParams, setQueryParams }) => {
  const page = queryParams.page;

  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage });
  };

  if (maxPages < 2) return;

  return (
    <div className="flex justify-center font-semibold gap-2 mt-10">
      {page >= 1 && (
        <button
          className="px-2 py-1"
          onClick={() => handlePageChange(page - 1)}
        >
          {page}
        </button>
      )}
      <button
        className="bg-task-bck px-2 py-1 rounded text-merit-credits-color"
        onClick={() => handlePageChange(page)}
      >
        {page + 1}
      </button>
      {page < maxPages - 1 && (
        <button
          className="px-2 py-1"
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 2}
        </button>
      )}
    </div>
  );
};

export default Pagination;
