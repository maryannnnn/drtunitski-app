import './pagination.scss'
import PaginationNumbers from "./PaginationItem";
import React from "react";

const Pagination = ({totalPages, currentPage, setPageNumber}) => {

    const pages = Array.from({length: totalPages}, (_, index) => index + 1);

    return (
        <nav className="pagination">
            <button className="pagination__item pagination__item-arrow"
                    disabled={currentPage === 1}
                    onClick={() => setPageNumber(currentPage - 1)}>
                prev
            </button>

            {pages.map((pageNumber) =>
                (<ul>
                    <PaginationNumbers pageNumber={pageNumber} setPageNumber={setPageNumber} currentPage={currentPage}/>
                </ul>)
            )}

            <button className="pagination__item pagination__item-arrow"
                    disabled={currentPage === totalPages}
                    onClick={() => setPageNumber(currentPage + 1)}>
                next
            </button>
        </nav>
    );
}

export default Pagination