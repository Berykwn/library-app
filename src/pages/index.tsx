import { Link } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import RiveWrapper from "../components/rive";
import { useEffect, useState } from "react";
import { Book, getBooks } from "../utils/apis/books";

const Home = () => {
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  useEffect(() => {
    getNewBookDatas();
  }, []);

  const getNewBookDatas = async () => {
    try {
      const resp = await getBooks("new", 1, 5);
      setNewBooks(resp.payload.datas);
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(newBooks);

  return (
    <MainLayout>
      <section className="w-full py-12 h-[50vh] px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        <div className="w-full h-full flex flex-col justify-center space-y-4 order-1 md:order-none">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Welcome to BookQuest
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Discover and borrow thousands of books at your fingertips.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="px-3 py-2 bg-black text-white rounded-lg"
              to="/books"
              data-testid="to-books"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full h-full hidden md:block">
          <RiveWrapper />
        </div>
      </section>

      <div className="flex justify-between my-9 w-full h-fit items-center">
        <p className="font-semibold text-lg tracking-wider">
          New Release Books
        </p>
        <Link className="text-sm tracking-wide" to="/books">
          Show all
        </Link>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {newBooks.length > 0 ? (
            newBooks.map((item, index) => (
              <Link
                className="max-w-sm bg-white overflow-hidden"
                to={`/book/${item.id}`}
                key={index}
              >
                <figure className="overflow-hidden shadow-md">
                  <img
                    className="h-auto w-auto object-cover aspect-[3/4]"
                    src={item.cover_image}
                    alt={item.title}
                    width={250}
                    height={330}
                  />
                </figure>
                <div className="p-4 text-center">
                  <h2 className="text-md font-semibold text-gray-800 dark:text-neutral-400">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm dark:text-neutral-500">
                    {item.author}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No new books available</p>
          )}
        </div>
      </div>

    </MainLayout>
  );
};

export default Home;
