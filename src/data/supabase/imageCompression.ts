export interface ImageDimensions {
  width: number
  height: number
}

export interface ImageCompressionOptions {
  maxSize?: number
  quality?: number
}

const defaultOptions = {
  maxSize: 1600,
  quality: 0.82,
}

export function getResizedDimensions({ width, height }: ImageDimensions, maxSize = defaultOptions.maxSize) {
  if (width <= 0 || height <= 0) {
    return { width, height }
  }

  const largestSide = Math.max(width, height)
  if (largestSide <= maxSize) {
    return { width, height }
  }

  const ratio = maxSize / largestSide

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('图片压缩失败。'))
        }
      },
      type,
      quality,
    )
  })
}

export async function compressImageFile(file: File, options: ImageCompressionOptions = {}) {
  if (!file.type.startsWith('image/')) {
    return file
  }

  const { maxSize, quality } = { ...defaultOptions, ...options }

  try {
    const image = await createImageBitmap(file)
    const dimensions = getResizedDimensions({ width: image.width, height: image.height }, maxSize)
    const canvas = document.createElement('canvas')
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const context = canvas.getContext('2d')
    if (!context) {
      image.close()
      return file
    }

    context.drawImage(image, 0, 0, dimensions.width, dimensions.height)
    image.close()

    const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
    const compressedName = file.name.replace(/\.[^.]+$/, '') || 'image'

    return new File([blob], `${compressedName}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  } catch {
    return file
  }
}
