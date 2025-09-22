import React from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
  forcePage?: number
}

export default function Pagination({ pageCount, onPageChange, forcePage }: Props) {
  return (
    <div className="d-flex justify-content-end">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        forcePage={forcePage}
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me px-2'}
        containerClassName={'pagination react-paginate'}
        activeClassName={'active'}
      />
    </div>
  )
}
