import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { getProducts } from "../api/services"; // <- yeni import

function HomePage() {
  // moved hooks/constants above useQuery so hooks order is stable
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getProducts(), // artık ortak yerden çağrılıyor
  });

  if (isLoading) return "Loading... ";

  if (error) return "An error has occurred: " + (error as any).message;

  const offset = currentPage * itemsPerPage;
  const currentItems = (data ?? []).slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(((data as any[])?.length ?? 0) / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto flex flex-wrap items-start justify-start gap-6 p-4">
        {currentItems.map((product: any) => (
          <div
            key={product.id}
            className="w-[350px] h-[480px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col"
          >
            <a href="#" className="h-64 flex-shrink-0">
              <img
                className="p-8 rounded-t-lg h-64 w-full object-contain"
                src={product.image}
                alt={product.title}
              />
            </a>
            <div className="px-5 pb-5 flex flex-col flex-grow">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                {product.title}
              </h5>

              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                    5.0
                  </span>
                </div>
              </div>
              <h6 className="text-sm mb-2 font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                {product.description}
              </h6>
              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        ))}
        {isFetching ? (
          <span className="w-full text-center">Updating...</span>
        ) : null}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          forcePage={currentPage}
          containerClassName="flex items-center gap-2"
          pageClassName="px-0 py-0 border rounded cursor-pointer"
          pageLinkClassName="block px-3 py-1 w-full h-full"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-0 py-0 border rounded cursor-pointer"
          previousLinkClassName="block px-3 py-1"
          nextClassName="px-0 py-0 border rounded cursor-pointer"
          nextLinkClassName="block px-3 py-1"
          disabledClassName="opacity-50 pointer-events-none"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default HomePage;
