import { usePagination, DOTS } from "../../hooks/usePagination";

const Pagination = (props) => {
    const {
        onPageChange,
        totalPage,
        siblingCount = 1,
        currentPage,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalPage,
        siblingCount,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={`flex`}>
            <li
                className={`h-8 text-center mx-1 text-black/80 flex items-center justify-center rounded-md w-8 hover:cursor-pointer hover:bg-black/10 ${currentPage === 1 && `pointer-events-none text-black/40`}`}
                onClick={onPrevious}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </li>
            {paginationRange.map((pageNumber, i) => {
                if (pageNumber === DOTS) {
                    return (
                        <li
                            key={i}
                            className="h-8 text-center mx-1 text-black/80 flex items-center justify-center rounded-md w-8 dots"
                        >
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={i}
                        className={`h-8 text-center mx-1 text-black/80 flex items-center justify-center rounded-md w-8 hover:cursor-pointer hover:bg-black/10 ${
                            pageNumber === currentPage && `bg-black/[0.15]`
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`h-8 text-center mx-1 text-black/80 flex items-center justify-center rounded-md w-8 hover:cursor-pointer hover:bg-black/10 ${currentPage === lastPage && `pointer-events-none text-black/40`}`}
                onClick={onNext}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </li>
        </ul>
    );
};

export default Pagination;
