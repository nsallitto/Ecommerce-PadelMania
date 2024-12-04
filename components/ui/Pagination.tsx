import Link from "next/link";

type PaginationProps = {
    page: number,
    totalPage: number
}

export default function Pagination({ page, totalPage }: PaginationProps) {

    const pages = Array.from({length:totalPage},(_, i) => (i + 1)) //-->este método nos permite crear e iterar 

    return (
        <nav className="flex justify-center py-10">
            {page > 1 ? (
                <Link
                    href={`/admin/products?page=${page - 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&laquo;</Link>
            ) : (
                <button
                    disabled
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 opacity-30 cursor-not-allowed"
                >&laquo;</button>
            )}

            {pages.map((currentPage) => (
                <Link
                    key={currentPage}
                    href={`/admin/products?page=${page}`}
                    className={`${page === currentPage && "font-bold"} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >{currentPage}</Link>
            ))}

            {page < totalPage ? (
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&raquo;</Link>
            ) : (
                <button
                    disabled
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 opacity-30 cursor-not-allowed"
                >&raquo;</button>
            )}
        </nav>
    )
}
