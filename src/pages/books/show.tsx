import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Book } from "../../utils/apis/books";
import { getBookById } from "../../utils/apis/books/api";
import Layout from "../../layouts/main-layout";
import { Separator } from "../../components/ui/separator";
import { badgeVariants } from "../../components/ui/badge";

const Show = () => {
  const [book, setBook] = useState<Book>();

  const params = useParams();

  useEffect(() => {
    getBookData();
  }, []);

  async function getBookData() {
    try {
      const resp = await getBookById(params.id_book!);
      setBook(resp.payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full h-full py-6 px-3 gap-5 items-center">
        <img
          className="object-contain aspect-[3/4] w-52 md:w-64 lg:w-96"
          src={book?.cover_image}
          alt={book?.title}
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide">{book?.title}</p>
            <p className="font-light text-sm text-muted-foreground">
              by {book?.author}
            </p>
            <Link className={`${badgeVariants()} w-fit`} to="/">
              {book?.category}
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex-grow">
            <p>{book?.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
