import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/sellect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Book, getBooks } from "../../utils/apis/books/index";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/ui/skleton";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortByQuery, setSortByQuery] = useState("default");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBookDatas();
  }, [sortByQuery, page]);

  const getBookDatas = async () => {
    try {
      const resp = await getBooks(sortByQuery, page, 10);
      setBooks(resp.payload.datas);
      setTotalPages(resp.payload.totalPages);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSortQueryChange = (value: string) => {
    setSortByQuery(value);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <MainLayout>
      <div className="flex justify-end py-2 px-4">
        <Select onValueChange={handleSortQueryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="default">Default</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {[...Array(10)].map((_, index) => (
            <div
              className="flex flex-col p-4 w-48 md:w-56 lg:w-64 h-fit items-center gap-3"
              key={index}
            >
              <Skeleton className="w-full h-[17rem]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {books.map((item, index) => (
            <div
              className="flex flex-col p-4 w-48 md:w-56 lg:w-64 h-fit items-center gap-3"
              key={index}
            >
              <Link
                className="flex flex-col w-full h-fit items-center gap-3"
                to={`/book/${item.id}`}
              >
                <figure className="overflow-hidden shadow-md shadow-neutral-300">
                  <img
                    className="h-auto w-auto object-cover aspect-[3/4]"
                    src={item.cover_image}
                    alt={item.title}
                    width={250}
                    height={330}
                    loading="lazy"
                  />
                </figure>
                <p className="font-bold text-lg tracking-wide text-center">
                  {item.title}
                </p>
                <p className="text-muted-foreground text-sm text-center">
                  {item.author}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-6">
          <div className="p-4 mb-4 w-3/4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            <span className="font-medium">Something went wrong!</span> Cannot
            find book data.
          </div>
        </div>
      )}

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <button onClick={handlePrevPage} disabled={page === 1}>
              <PaginationPrevious size="default" />
            </button>
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <button onClick={() => setPage(i + 1)} disabled={page === i + 1}>
                <PaginationLink isActive={page === i + 1} size="default">
                  {i + 1}
                </PaginationLink>
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              <PaginationNext size="default" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MainLayout>
  );
};

export default Books;
