import { useState, useRef } from 'react'
import { compressImageToBase64, getBase64SizeKb, isValidImageType } from '../utils/imageUtils'

const useCamera = () => {
  const [photo, setPhoto]             = useState(null)
  const [photo_size_kb, setPhotoSizeKb] = useState(null)
  const [photo_error, setPhotoError]  = useState(null)
  const [photo_loading, setPhotoLoading] = useState(false)
  const file_input_ref = useRef(null)

  const processFile = async (file) => {
    if (!file) return

    if (!isValidImageType(file)) {
      setPhotoError('Invalid file type. Use JPG, PNG or WEBP.')
      return
    }

    setPhotoLoading(true)
    setPhotoError(null)

    try {
      const base64 = await compressImageToBase64(file)
      const size_kb = getBase64SizeKb(base64)

      setPhoto(base64)
      setPhotoSizeKb(size_kb)
    } catch (err) {
      setPhotoError(err.message || 'Error processing image')
    } finally {
      setPhotoLoading(false)
    }
  }

  const openCamera = () => {
    if (file_input_ref.current) {
      file_input_ref.current.setAttribute('capture', 'environment')
      file_input_ref.current.click()
    }
  }

  const openGallery = () => {
    if (file_input_ref.current) {
      file_input_ref.current.removeAttribute('capture')
      file_input_ref.current.click()
    }
  }

  const clearPhoto = () => {
    setPhoto(null)
    setPhotoSizeKb(null)
    setPhotoError(null)
    if (file_input_ref.current) {
      file_input_ref.current.value = ''
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  return {
    photo,
    photo_size_kb,
    photo_error,
    photo_loading,
    file_input_ref,
    openCamera,
    openGallery,
    clearPhoto,
    handleFileChange
  }
}

export default useCamera