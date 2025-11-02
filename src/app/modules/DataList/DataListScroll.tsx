import ErrorNoData from '@app/components/Error/ErrorNoData'
import api from '@app/services/api-request.service'
import { Loader } from '@app/styled/loader.styled'
import axios from 'axios'
import { motion } from 'framer-motion'
import { get } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import styled from 'styled-components'

interface IDataListScroll {
  filterParams: any
  skeleton: any
  selected: any
  path: string
  respDataApi: (data: any[]) => void
  children: React.ReactNode
  pageSize?: number
  sizeIncrement?: number
  skeletonCount?: number
}

const DataListScroll = ({
  filterParams = {},
  selected,
  path,
  respDataApi,
  children,
  pageSize = 12,
  sizeIncrement = 6,
  skeletonCount = 12,
  skeleton,
}: IDataListScroll) => {
  const cancelSource = useRef(axios.CancelToken.source())
  const [respData, setRespData] = useState<any[]>([])
  const [dataSelected, setDataSelected] = useState<any>(selected)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [size, setSize] = useState<number>(pageSize)
  const [customFilters, setCustomFilters] = useState<any>(filterParams ?? {})
  const fetchingRef = useRef(false)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const getAllData = async (fetchSize: number, isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true)
    else setInitialLoading(true)

    fetchingRef.current = true

    const params = {
      page: 1,
      size: fetchSize,
      ...customFilters,
    }

    try {
      const req = await api.post({
        url: `${path}/get-all`,
        data: params,
        cancelToken: cancelSource.current.token,
      })
      const data = get(req, 'data', [])

      if (Array.isArray(data)) {
        setRespData(data)
        respDataApi?.(data)
        setHasMore(data.length >= fetchSize)
        setNoData(data.length === 0)
      }

      setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        const isStillAtBottom = scrollTop + windowHeight >= documentHeight - 10
        if (isStillAtBottom && data.length >= fetchSize) {
          setSize((prev) => prev + sizeIncrement)
        }
      }, 300)
    } catch (error: any) {
      if (axios.isCancel(error)) return
      console.error('Fetch error:', error)
      setNoData(true)
      setHasMore(false)
    } finally {
      fetchingRef.current = false
      setInitialLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(() => {
      setCustomFilters(filterParams)
    }, 1000)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [filterParams])

  useEffect(() => {
    cancelSource.current.cancel('Cancel previous request')
    cancelSource.current = axios.CancelToken.source()

    setRespData([])
    setSize(pageSize)
    getAllData(pageSize)
  }, [customFilters])

  useEffect(() => {
    const handleScroll = () => {
      if (initialLoading || loadingMore || !hasMore || fetchingRef.current) return

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

      const isAtBottom = scrollTop + windowHeight >= documentHeight - 5
      if (isAtBottom) {
        setSize((prev) => prev + sizeIncrement)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [initialLoading, loadingMore, hasMore, size, sizeIncrement])

  useEffect(() => {
    if (size > pageSize) {
      getAllData(size, true)
    }
  }, [size])

  useEffect(() => {
    const checkScrollable = () => {
      const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      const windowHeight = window.innerHeight
      if (documentHeight <= windowHeight && hasMore && !initialLoading && !loadingMore) {
        console.log('🪄 Auto expand size (no scroll yet)')
        setSize((prev) => prev + sizeIncrement)
      }
    }
    checkScrollable()
  }, [respData, hasMore, initialLoading, loadingMore, sizeIncrement])

  return (
    <Container>
      <Row className="g-3">
        {initialLoading ? skeleton && Array.from({ length: skeletonCount }).map((_, index) => React.cloneElement(skeleton, { key: index })) : children}
      </Row>
      {loadingMore && (
        <LoadStatus>
          <Loader color="var(--primary)" size={35} /> &nbsp; Loading more data...
        </LoadStatus>
      )}
      {!loadingMore && noData && !initialLoading && <ErrorNoData />}
      {!loadingMore && !hasMore && !initialLoading && !noData && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <NoMoreData>
            <motion.span
              transition={{
                delay: 0.4,
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Tidak ada data lagi
            </motion.span>
          </NoMoreData>
        </motion.div>
      )}
    </Container>
  )
}

export default DataListScroll

const Container = styled.div`
  padding: 1rem 0;
`

const LoadStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  font-size: 0.95rem;
  color: var(--gray-600);
`

const NoMoreData = styled.div`
  text-align: center;
  color: var(--black-70);
  font-weight: 500;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  span {
    font-size: 1rem;
  }
`
