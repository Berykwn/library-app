import { useEffect, useState } from "react";
import MainLayout from "../layouts/main-layout";
import RiveWrapper from "../components/rive";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/skleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/sellect";
import { Book, getBooks } from "../utils/apis/books";

const Home = () => {
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByQuery, setSortByQuery] = useState("new");
  const booksPerPage = 4;

  useEffect(() => {
    getNewBookDatas();
  }, [sortByQuery]);

  const getNewBookDatas = async () => {
    try {
      setLoading(true);
      const resp = await getBooks(sortByQuery, currentPage, booksPerPage);
      setNewBooks(resp.payload.datas);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadMoreBooks = async () => {
    try {
      const nextPage = currentPage + 1;
      const resp = await getBooks(sortByQuery, nextPage, booksPerPage);
      setNewBooks([...newBooks, ...resp.payload.datas]);
      setCurrentPage(nextPage);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSortQueryChange = (value: string) => {
    setSortByQuery(value);
  };

  return (
    <MainLayout>
      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-8 lg:mt-12 lg:px-8 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl text-center md:text-left text-stone-600 leading-tight font-medium">
              Your Personal Library
            </h2>
            <span className="text-2xl lg:text-3xl text-center md:text-left text-stone-500 leading-tight font-medium italic">
              Anywhere, Anytime
            </span>
            <h3 className="mt-6 md:mt-4 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
              Discover your next favorite book with our app! Explore a vast
              collection, get personalized recommendations, and enjoy offline
              reading. Sync across devices, highlight, bookmark, and join a
              community of book lovers. Start your reading adventure today!
            </h3>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <Link to="/books" className="text-center w-full sm:w-40 px-3 py-2 rounded font-semibold text-md bg-stone-400 text-white">
                Get started
              </Link>
            </div>
          </div>
          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="w-full h-full hidden md:block -mt-8">
              <RiveWrapper />
            </div>
          </div>
        </div>
      </section>

      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-4 mx-auto">
        <div className="flex justify-between my-9 w-full h-fit items-center">
          <p className="font-semibold text-lg tracking-wider text-stone-600">
            New Release Books
          </p>
          <Select onValueChange={handleSortQueryChange}>
            <SelectTrigger className="w-[220px] text-stone-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newBooks.length > 0 ? (
              newBooks.map((item, index) => (
                <div key={index} className="max-w-sm bg-white overflow-hidden">
                  {loading ? (
                    <>
                      <Skeleton className="w-full h-[17rem]" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </>
                  ) : (
                    <Link
                      className="max-w-sm bg-white overflow-hidden"
                      to={`/book/${item.id}`}
                    >
                      <figure className="overflow-hidden shadow-md">
                        <img
                          className="h-auto w-auto object-cover aspect-[3/4] opacity-85"
                          src={item.cover_image}
                          alt={item.title}
                          width={250}
                          height={330}
                          loading="lazy"
                        />
                      </figure>
                      <div className="p-4 text-center">
                        <h2 className="text-md font-semibold text-stone-700 dark:text-neutral-400">
                          {item.title}
                        </h2>
                        <p className="text-stone-600 mt-2 text-sm dark:text-neutral-500">
                          {item.author}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <p>No new books available</p>
            )}
          </div>

          <div className="flex justify-center my-8">
            <button
              className="px-4 py-2  text-white bg-stone-400 rounded-md cursor-pointer"
              onClick={loadMoreBooks}
            >
              Load more books..
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
