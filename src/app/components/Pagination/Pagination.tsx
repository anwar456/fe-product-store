import { setActivePaging, setPagingLimit } from '@app/store/reducers/ui'
import { DFlex, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import CarretLeftIcon from '../Icons/CarretLeftIcon'
import CarretRightIcon from '../Icons/CarretRightIcon'
import SelectStatic from '../Select/SelectStatic'

interface Props {
  pagination: any
  onPageChange: (selectedItem: any) => void
  forcePage?: boolean
  globalPageActive?: boolean
}

export default function Pagination({ pagination, onPageChange, forcePage = false, globalPageActive = true }: Props) {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  const { watch, control } = useForm()
  const { pagingLimit } = useSelector((state: any) => state.ui)

  const onClickPageLink = (v: any) => {
    onPageChange(v)
    if (forcePage) {
      searchParams.delete('page')
      searchParams.append('page', v?.selected + 1)
      setSearchParams(searchParams)
    }
    if (globalPageActive) {
      dispatch(setActivePaging(v?.selected + 1))
    }
  }

  useEffect(() => {
    if (watch('pagingLimit')) {
      dispatch(setPagingLimit(watch('pagingLimit')))
    }
  }, [watch('pagingLimit')])

  return (
    <PaginationContainer>
      <DFlexJustifyBetween>
        <DFlex>
          <P14Medium>Menampilkan</P14Medium>
          <SelectStatic
            isClearable={false}
            options={OPTION_PAGING_LIMIT()}
            control={control}
            errors=""
            fieldName="pagingLimit"
            additionalOptions={{ menuPlacement: 'auto' }}
            defaultValue={pagingLimit}
            className="w-60"
          />
          <P14Medium>
            Dari <span className="text-primary">{pagination?.totalData}</span> Data
          </P14Medium>
        </DFlex>
        <div className="d-flex justify-content-end">
          <ReactPaginate
            pageCount={pagination?.pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={onClickPageLink}
            forcePage={pagination?.currentPage}
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

export const OPTION_PAGING_LIMIT = () => [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '150', value: 150 },
  { label: '200', value: 200 },
  { label: '300', value: 300 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
]

const PaginationContainer = styled.div`
  border-top: none;
  border-left: 1px solid var(--black-100);
  border-right: 1px solid var(--black-100);
  border-bottom: 1px solid var(--black-100);
  border-radius: 0 0 1rem 1rem;
  padding: 1rem 1.66667rem;
`
