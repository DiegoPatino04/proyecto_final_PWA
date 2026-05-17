import { useState, useRef } from 'react'
import { compressImageToBase64, getBase64SizeKb, isValidImageType } from '../utils/imageUtils'

export default function PhotoCapture({ onPhotoChange }) {
  const [photo, setPhoto]               = useState(null)
  const [photo_size_kb, setPhotoSizeKb] = useState(null)
  const [photo_error, setPhotoError]    = useState(null)
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
      const base64  = await compressImageToBase64(file)
      const size_kb = getBase64SizeKb(base64)

      setPhoto(base64)
      setPhotoSizeKb(size_kb)
      onPhotoChange(base64)
    } catch (err) {
      setPhotoError(err.message || 'Error processing image')
      onPhotoChange(null)
    } finally {
      setPhotoLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
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
    onPhotoChange(null)
    if (file_input_ref.current) file_input_ref.current.value = ''
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={file_input_ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {!photo ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl
                        p-8 flex flex-col items-center gap-4">
          <span className="text-4xl">📷</span>
          <p className="text-gray-400 text-sm text-center">
            Take a photo or choose from gallery
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={openCamera}
              disabled={photo_loading}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm
                         font-medium px-4 py-2 rounded-lg transition-colors"
            >
              📷 Camera
            </button>
            <button
              type="button"
              onClick={openGallery}
              disabled={photo_loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm
                         font-medium px-4 py-2 rounded-lg transition-colors"
            >
              🖼️ Gallery
            </button>
          </div>
          {photo_loading && (
            <p className="text-violet-500 text-sm animate-pulse">
              ⏳ Compressing image...
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative">
            <img
              src={photo}
              alt="Census photo"
              className="w-full max-h-64 object-cover rounded-xl border border-gray-200"
            />
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600
                         text-white rounded-full w-7 h-7 flex items-center
                         justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>✅ Photo ready</span>
            <span className={`font-mono font-medium ${
              parseFloat(photo_size_kb) > 45 ? 'text-amber-500' : 'text-green-500'
            }`}>
              {photo_size_kb} kb / 50 kb max
            </span>
          </div>
        </div>
      )}

      {photo_error && (
        <p className="text-red-500 text-sm">{photo_error}</p>
      )}
    </div>
  )
}