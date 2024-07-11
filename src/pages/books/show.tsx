import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../utils/apis/books";
import { getBookById } from "../../utils/apis/books/api";
import Layout from "../../layouts/main-layout";
import { Separator } from "../../components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../utils/contexts/token";

const Show = () => {
  const [book, setBook] = useState<Book | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<Book[]>([]);

  const { addNotification } = useAuth();

  const params = useParams<{ id_book: string }>();

  useEffect(() => {
    getBookData();
    loadCartFromLocalStorage();
  }, []);

  async function getBookData() {
    try {
      const resp = await getBookById(params.id_book!);
      setBook(resp.payload);
    } catch (error) {
      console.log(error);
    }
  }

  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("myCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }

  function addToCart() {
    if (book) {
      const updatedCart = [...cartItems, book];
      setCartItems(updatedCart);
      localStorage.setItem("myCart", JSON.stringify(updatedCart));
      addNotification("book has been added to cart!", "success");
      setIsModalOpen(false);
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <Layout>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="w-1/3 p-4 bg-white rounded-lg shadow-lg"
          >
            <h2 className="mb-2 text-xl font-bold">Confirm add to cart!</h2>
            <p className="mb-4">Are you sure to borrow this book?t </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={addToCart}
                className="px-4 py-2 font-semibold text-white bg-stone-500 rounded shadow-md hover:bg-stone-400"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 font-semibold text-white bg-gray-500 rounded shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full h-full py-6 px-3 gap-5 items-center">
        <img
          className="object-contain aspect-[3/4] w-52 md:w-64 lg:w-96 opacity-85"
          src={book?.cover_image}
          alt={book?.title}
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide text-stone-700">
              {book?.title}
            </p>
            <p className="font-light text-sm text-muted-foreground text-stone-500">
              by {book?.author}
            </p>
            <button
              className="w-full mt-2 sm:w-40 px-3 py-2 rounded font-semibold text-md border border-stone-400 text-stone-600 flex items-center justify-center"
              title="Add to cart"
              onClick={openModal}
            >
              <ShoppingCart className="mr-4" />
              Add to cart
            </button>
          </div>
          <Separator className="my-4" />
          <div className="flex-grow">
            <p className="text-stone-600">{book?.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
