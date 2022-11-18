import _ from "lodash";



const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pageCount = items / pageSize;
    if (Math.ceil(pageCount) === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {pages.map((page) => (
                    // <li
                    //     key={page}
                    //     className={
                    //         page === currentPage ? "page-item active" : "page-item"
                    //     }
                    // >
                    //     <a
                    //         style={{ cursor: "pointer" }}
                    //         onClick={() => onPageChange(page)}
                    //         className="page-link"
                    //     >
                    //         {page}
                    //     </a>
                    // </li>
                    <a key={page}
                        onClick={() => onPageChange(page)}
                        style={{ cursor: "pointer" }}
                        className={page === currentPage ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20" : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
                    >{page}
                    </a>
                ))}
            </nav>

            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    <span className="sr-only">Previous</span>
                </a>
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                >
                    1
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    2
                </a>
                <a
                    href="#"
                    className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                >
                    3
                </a>
                <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                    ...
                </span>
                <a
                    href="#"
                    className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                >
                    8
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    9
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    10
                </a>
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    <span className="sr-only">Next</span>
                </a>
            </nav>
        </>
    );
};

export default Pagination;