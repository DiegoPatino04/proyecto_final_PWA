const MAX_SIZE_KB  = 50
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024

// Converts a File object to base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsDataURL(file)
  })
}

// Compresses an image File until it fits under 50kb in base64
export const compressImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const object_url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(object_url)

      const canvas  = document.createElement('canvas')
      const ctx     = canvas.getContext('2d')

      // Start at original size, scale down if needed
      let width  = img.width
      let height = img.height
      let quality = 0.9

      const tryCompress = () => {
        canvas.width  = width
        canvas.height = height
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)

        const base64 = canvas.toDataURL('image/jpeg', quality)
        const size_bytes = Math.ceil((base64.length - 'data:image/jpeg;base64,'.length) * 3 / 4)

        if (size_bytes <= MAX_SIZE_BYTES) {
          resolve(base64)
          return
        }

        // Reduce quality first, then size
        if (quality > 0.3) {
          quality -= 0.1
        } else {
          width  = Math.floor(width  * 0.8)
          height = Math.floor(height * 0.8)
          quality = 0.7
        }

        // Safety check — avoid infinite loop
        if (width < 50 || height < 50) {
          reject(new Error('Image cannot be compressed to under 50kb'))
          return
        }

        tryCompress()
      }

      tryCompress()
    }

    img.onerror = () => reject(new Error('Error loading image'))
    img.src = object_url
  })
}

// Returns size info for UI feedback
export const getBase64SizeKb = (base64_string) => {
  const base64_data = base64_string.replace(/^data:image\/\w+;base64,/, '')
  const size_bytes  = Math.ceil(base64_data.length * 3 / 4)
  return (size_bytes / 1024).toFixed(1)
}

export const isValidImageType = (file) => {
  return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
}