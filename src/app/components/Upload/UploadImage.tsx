import api from '@app/services/api-request.service'
import { DFlex, DFlexColumn, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P12Medium, P14Medium } from '@app/styled/text.styled'
import { get, size } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, ProgressBar } from 'react-bootstrap'
import styled from 'styled-components'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ImageIcon from '../Icons/ImageIcon'
import TrashIcon from '../Icons/TrashIcon'
import UploadIcon from '../Icons/UploadIcon'
import LazyImage from '../Lazy/LazyImage'

interface Props {
  accept?: string
  setValue: any
  fieldName: string
  watch: any
  multiple?: boolean
}

export default function UploadImage({ accept = 'image/*', setValue, fieldName, watch, multiple = true }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [totalProgress, setTotalProgress] = useState<number>(0)
  const watchFiles = watch(fieldName)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const fileArray = Array.from(selectedFiles)
    await uploadQueue(fileArray)
  }

  const uploadQueue = async (fileArray: File[]) => {
    setLoading(true)
    let completed = 0

    for (const file of fileArray) {
      await uploadImage(file, (percent: number) => {
        const total = Math.round(((completed + percent / 100) / fileArray.length) * 100)
        setTotalProgress(total)
      })
      completed++
    }

    setLoading(false)
    setTotalProgress(0)
  }

  const uploadImage = async (file: any, onProgress: (percent: number) => void) => {
    const paramsData = new FormData()
    paramsData.append('file', file)

    try {
      const res = await api.post({
        url: '/upload/upload-file',
        data: paramsData,
        onUploadProgress: (event: any) => {
          const percent = Math.round((event.loaded * 100) / event.total)
          onProgress(percent)
        },
      })

      const data = get(res, 'data')
      if (data) {
        setFiles((prev) => [
          ...prev,
          {
            public_id: data.public_id,
            url: data.url,
            fileName: file.name,
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

   const handleDeleteFile = async (public_id: any, index: number) => {
     if (multiple) {
       try {
         await api.delete({
           url: '/upload/delete',
           params: { public_id },
         })

         const updatedWatchFiles = watchFiles.filter((_: any, i: number) => i !== index)
         setValue(fieldName, updatedWatchFiles)
       } catch (error) {
         console.log(error)
       }
     } else {
       setValue(fieldName, null)
     }

     setFiles((prev) => prev.filter((item) => item?.public_id !== public_id))
   }


  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

   useEffect(() => {
     if (!files || files.length === 0) return

     const existingFiles = watchFiles || []

     if (multiple) {
       const mergedFiles = [...existingFiles, ...files]
       setValue(fieldName, mergedFiles)
     } else {
       const latestFile = files[files.length - 1]
       setValue(fieldName, latestFile?.url)
     }

     setFiles([])
   }, [files])

  return (
    <DFlexColumn className="cursor-pointer">
      <CardUploadImage>
        {multiple ? (
          size(watchFiles) > 0 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={10}
              style={{ width: '100%', height: '100%' }}
              className="position-relative"
            >
              {watchFiles?.map((file: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <CardActionContainer>
                    <CardAction className="px-2">
                      <DFlexJustifyBetween>
                        <P12Medium className="text-truncate elipsis font-weight-500">{file?.fileName}</P12Medium>
                        <div role="button" className="cursor-pointer" onClick={() => handleDeleteFile(file?.public_id, idx)}>
                          <TrashIcon />
                        </div>
                      </DFlexJustifyBetween>
                    </CardAction>
                  </CardActionContainer>
                  <LazyImage
                    src={file?.url}
                    height="100%"
                    width="100%"
                    style={{
                      borderRadius: '.5rem',
                      objectFit: 'contain',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <ImageIcon />
          )
        ) : watchFiles ? (
          <>
            <CardActionContainer style={{top: '0'}}>
              <CardAction className="px-2">
                <DFlexJustifyBetween>
                  <P12Medium className="text-truncate elipsis font-weight-500">Image</P12Medium>
                  <div role="button" className="cursor-pointer" onClick={() => handleDeleteFile(null, 0)}>
                    <TrashIcon />
                  </div>
                </DFlexJustifyBetween>
              </CardAction>
            </CardActionContainer>
            <LazyImage
              src={watchFiles}
              height="100%"
              width="100%"
              style={{
                borderRadius: '.5rem',
                objectFit: 'contain',
              }}
            />
          </>
        ) : (
          <ImageIcon />
        )}

        <Form.Control type="file" className="d-none" ref={fileInputRef} onChange={handleFileChange} accept={accept} multiple={multiple} />
      </CardUploadImage>

      <Button className="w-100" variant="secondary" onClick={handleUploadClick} disabled={loading}>
        <DFlex className="justify-content-center">
          <UploadIcon />
          <P14Medium>{loading ? 'Mengunggah...' : 'Unggah Gambar'}</P14Medium>
        </DFlex>
      </Button>

      {loading && <ProgressBar now={totalProgress} label={`${totalProgress}%`} className="w-100" style={{ marginTop: '-.5rem' }} />}
    </DFlexColumn>
  )
}

const CardUploadImage = styled(Card)`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: none;
  background: var(--black-25);
  .swiper-pagination-bullet {
    background: var(--primary) !important;
    opacity: 0.3 !important;
    width: 7px;
    height: 7px;
    transition: 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
    background: var(--primary) !important;
    transform: scale(1.2);
  }

  .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 0px;
  }
`

const CardActionContainer = styled.div`
  position: absolute;
  width: 100%;
  padding: 0.5rem;
`

const CardAction = styled(Card)`
  opacity: 0.7;
  background: var(--black-100);
`
