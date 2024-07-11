import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { getBorrows } from "../../utils/apis/borrows/api";
import { Borrow } from "../../utils/apis/borrows/type";
// import { getBorrows } from "../../api"; // Import fungsi getBorrows
// import { Borrow } from "./type"; // Pastikan tipe data sudah didefinisikan dengan benar

const AdminDashboard = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await getBorrows(currentPage, 5);
        setBorrows(response.payload.datas);
        setTotalPages(response.payload.totalPages);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    };

    fetchBorrows();
  }, [currentPage]);

  return (
    <MainLayout>
      <section className="container px-4 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Borrows
              </h2>
              <span className="px-3 py-1 text-xs text-stone-600 bg-stone-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {borrows.length} borrows per page
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              borrowed books from all users.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-stone-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span className="flex items-center gap-x-3 focus:outline-none">
                          Title
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Borrow date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Due date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Returned date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Users
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {borrows.map((borrow) => (
                      <tr key={borrow.id}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          {borrow.book.title}
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          {new Date(borrow.borrow_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {new Date(borrow.due_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {borrow.return_date
                            ? new Date(borrow.return_date).toLocaleDateString()
                            : "Not returned"}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {borrow.user.full_name}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>previous</span>
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminDashboard;
