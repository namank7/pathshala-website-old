import { region } from "./aws-config"
import { generatePresignedUploadUrl, getPublicUrlPathStyle } from "@/app/actions/s3-actions"

// S3 bucket name and ARN
export const userUploadsBucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET || ""
export const userUploadsBucketArn = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_ARN || ""

// Generate pre-signed URL for uploading (using server action)
export async function generatePresignedUrl(key: string, contentType: string): Promise<string> {
  if (!userUploadsBucket) {
    throw new Error("S3 bucket name is not configured")
  }

  return generatePresignedUploadUrl(key, contentType)
}

// Get public URL for an object using path-style URL (using server action)
export async function getPublicUrl(key: string): Promise<string> {
  if (!userUploadsBucket) {
    throw new Error("S3 bucket name is not configured")
  }

  return getPublicUrlPathStyle(key)
} 