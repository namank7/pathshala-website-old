import { generatePresignedUrl, getPublicUrl } from "./s3-config"

export async function uploadImageToS3(
  imageFile: File,
  userId: string,
  maxWidth = 800,
  quality = 0.7
): Promise<{ thumbnailUrl: string; fullImageUrl: string }> {
  try {
    console.log("Starting image upload process...")
    
    // Create thumbnail for Cognito (max 2KB)
    const thumbnail = await createThumbnail(imageFile, 200, 0.5)
    console.log("Thumbnail created, size:", thumbnail.size, "bytes")
    
    // Create optimized full-size image
    const fullImage = await createThumbnail(imageFile, maxWidth, quality)
    console.log("Full-size image created, size:", fullImage.size, "bytes")
    
    // Generate unique keys for S3
    const timestamp = Date.now()
    const thumbnailKey = `users/${userId}/profile/thumbnail-${timestamp}.jpg`
    const fullImageKey = `users/${userId}/profile/full-${timestamp}.jpg`
    console.log("Generated keys:", { thumbnailKey, fullImageKey })
    
    // Get pre-signed URLs for upload
    console.log("Generating pre-signed URLs...")
    const thumbnailUploadUrl = await generatePresignedUrl(thumbnailKey, "image/jpeg")
    const fullImageUploadUrl = await generatePresignedUrl(fullImageKey, "image/jpeg")
    console.log("Pre-signed URLs generated")
    
    // Upload both versions to S3 using pre-signed URLs
    console.log("Starting S3 uploads...")
    await Promise.all([
      uploadToS3WithPresignedUrl(thumbnailUploadUrl, thumbnail, thumbnailKey),
      uploadToS3WithPresignedUrl(fullImageUploadUrl, fullImage, fullImageKey)
    ])
    console.log("S3 uploads completed")
    
    // Return public URLs using path-style format
    const [thumbnailUrl, fullImageUrl] = await Promise.all([
      getPublicUrl(thumbnailKey),
      getPublicUrl(fullImageKey)
    ])
    
    const urls = { thumbnailUrl, fullImageUrl }
    console.log("Generated public URLs:", urls)
    return urls
  } catch (error) {
    console.error("Error in uploadImageToS3:", error)
    throw error
  }
}

async function createThumbnail(
  file: File,
  maxSize: number,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        } else if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress the image
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Failed to create image blob"))
            }
          },
          "image/jpeg",
          quality
        )
      }
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function uploadToS3WithPresignedUrl(presignedUrl: string, blob: Blob, key: string): Promise<void> {
  try {
    console.log(`Starting upload for ${key}, size: ${blob.size} bytes`)
    console.log("Using presigned URL:", presignedUrl)
    
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: blob,
      headers: {
        "Content-Type": "image/jpeg"
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("S3 upload failed:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: presignedUrl,
        key,
        blobSize: blob.size
      })
      throw new Error(`Failed to upload to S3: ${response.status} ${response.statusText} - ${errorText}`)
    }
    
    console.log(`Upload successful for ${key}`)
  } catch (error) {
    console.error(`Error in uploadToS3WithPresignedUrl for ${key}:`, error)
    throw error
  }
} 