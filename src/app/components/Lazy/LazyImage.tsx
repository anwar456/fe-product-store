import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface ILazyImage {
  src: string
  defaultImage?: string
  className?: string
  style?: any
  width?: any
  height?: any
  alt?: any
  onClick?: any
}

const LazyImage = ({ defaultImage = '/static/male.svg', ...imageProps }: ILazyImage) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setShouldLoad(true)
        }
      })
      observer.observe(placeholderRef.current)
      return () => observer.disconnect()
    }
  }, [shouldLoad, placeholderRef])
  if (imageProps.src == '/cdnnull' || imageProps.src?.includes('comstring')) {
    return <Image src={defaultImage} className={imageProps?.className} />
  }

  return shouldLoad ? (
    <Image
      {...imageProps}
      onError={(e: any) => {
        e.target.onerror = null
        e.target.src = defaultImage
      }}
    />
  ) : (
    <>
      <div className="img-placeholder" ref={placeholderRef}></div>
    </>
  )
}

export const Image = styled.img`
  object-fit: cover;
  &.avatar {
    border-radius: 50% !important;
    object-fit: cover !important;
  }
`

export default LazyImage
