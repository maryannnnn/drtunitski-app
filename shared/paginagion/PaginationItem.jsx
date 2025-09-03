import React from "react";

const PaginationItem = ({pageNumber, currentPage, setPageNumber}) => {

    return (
        <li className={` pagination__item pagination__item-${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => setPageNumber(pageNumber)}>
            {pageNumber}
        </li>
    )
}

export default PaginationItem