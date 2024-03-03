import { PaginationProps } from "@/common";

const Pagination = ({ currentPage, onPageChange, pages }: PaginationProps) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        {"<"}
      </button>
      {[...Array(pages)].map((_, index) => (
        <button
          key={index + 1}
          className={`p-2 rounded-md ${
            currentPage === index + 1 ? "text-blue-500" : "text-gray-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(pages, currentPage + 1))}
        disabled={currentPage >= pages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
