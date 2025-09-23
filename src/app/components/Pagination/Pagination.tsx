import React from 'react'
import ReactPaginate from 'react-paginate'
import CarretLeftIcon from '../Icons/CarretLeftIcon'
import CarretRightIcon from '../Icons/CarretRightIcon'
import { DFlex, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import styled from 'styled-components'

interface Props {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
  forcePage?: number
}

export default function Pagination({ pageCount, onPageChange, forcePage }: Props) {
  return (
    <PaginationContainer>
      <DFlexJustifyBetween>
        <DFlex>
          <P14Medium>Menampilkan</P14Medium>
          <P14Medium>15</P14Medium>
          <P14Medium>
            Dari <span className="text-primary">52</span> Data
          </P14Medium>
        </DFlex>
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
            previousLabel={<CarretLeftIcon />}
            nextLabel={<CarretRightIcon />}
            breakLabel={'...'}
            breakClassName={'break-me px-2'}
            containerClassName={'pagination react-paginate'}
            activeClassName={'active'}
          />
        </div>
      </DFlexJustifyBetween>
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  border-top: none;
  border-left: 1px solid var(--black-100);
  border-right: 1px solid var(--black-100);
  border-bottom: 1px solid var(--black-100);
  border-radius: 0 0 1rem 1rem;
  padding: 1rem 1.66667rem;
`
