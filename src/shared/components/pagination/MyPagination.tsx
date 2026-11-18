import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { MetaData } from "@/types/baseResponse";
import { useSearchParams } from "react-router";

export function MyPagination({
  meta = { currentPage: 1, totalPages: 1, total: 0, limit: 10 },
}: {
  meta?: MetaData;
}) {
  const { currentPage, totalPages } = meta;
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageQuery = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    setSearchParams(params);
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("ellipsis");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className="w-fit rounded-2xl bg-primary p-2 shadow-xl">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageQuery(Math.max(1, currentPage - 1))}
            onClick={(e) => {
              if (currentPage > 1) {
                handlePageClick(e, currentPage - 1);
              } else {
                e.preventDefault();
              }
            }}
            className={`${
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "cursor-pointer "
            } text-primary-foreground`}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-primary-foreground" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageQuery(page as number)}
                isActive={page === currentPage}
                onClick={(e) => handlePageClick(e, page as number)}
                className={`cursor-pointer text-primary-foreground  ${
                  page === currentPage &&
                  "bg-linear-to-r gradientBg font-bold border-none shadow-md shadow-[#8027F5]/30"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={createPageQuery(Math.min(totalPages, currentPage + 1))}
            onClick={(e) => {
              if (currentPage < totalPages) {
                handlePageClick(e, currentPage + 1);
              } else {
                e.preventDefault();
              }
            }}
            className={`${
              currentPage === totalPages
                ? "pointer-events-none opacity-40 "
                : "cursor-pointertransition-colors"
            } text-primary-foreground`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
