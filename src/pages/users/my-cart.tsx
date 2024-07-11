import { Link } from "react-router-dom";
import MainLayout from "../../layouts/main-layout";
import { useState, useEffect } from "react";
import { Book } from "../../utils/apis/books";
import { useAuth } from "../../utils/contexts/token";

const MyCart = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const { addNotification } = useAuth();

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("myCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }

  function removeFromCart(index: number) {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setDeleteIndex(null);
    addNotification("book has been removed from cart!", "success");
  }

  return (
    <MainLayout>
      <section className="px-8 py-3 text-xl text-stone-700">
        <h1>My book cart</h1>
      </section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cartItems.map((item, index) => (
            <div key={index} className="max-w-sm bg-white overflow-hidden">
              <Link
                to={`/book/${item.id}`}
                className="max-w-sm bg-white overflow-hidden"
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
              <button
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md"
                onClick={() => setDeleteIndex(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-xl font-bold">
              Confirm delete item from cart
            </h2>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => removeFromCart(deleteIndex)}
                className="px-4 py-2 font-semibold text-white bg-stone-500 rounded shadow-md hover:bg-stone-400"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 font-semibold text-white bg-gray-500 rounded shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default MyCart;
