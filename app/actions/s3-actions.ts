'use server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { fromSSO } from "@aws-sdk/credential-providers"

// Initialize S3 client with SSO credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: fromSSO({
    profile: process.env.AWS_PROFILE!
  }),
  forcePathStyle: true
})

// S3 bucket name from environment variables
const userUploadsBucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET

export async function generatePresignedUploadUrl(key: string, contentType: string): Promise<string> {
  if (!userUploadsBucket) {
    throw new Error("S3 bucket name is not configured")
  }

  if (!process.env.AWS_PROFILE) {
    throw new Error("AWS profile is not configured")
  }

  console.log("Generating presigned URL for:", {
    bucket: userUploadsBucket,
    key,
    contentType,
    region: process.env.AWS_REGION
  })

  const command = new PutObjectCommand({
    Bucket: userUploadsBucket,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  })

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600
    })
    console.log("Generated presigned URL:", signedUrl)
    return signedUrl
  } catch (error) {
    console.error("Error generating pre-signed URL:", error)
    throw error
  }
}

// Get public URL for an object using path-style URL
export async function getPublicUrlPathStyle(key: string): Promise<string> {
  if (!userUploadsBucket) {
    throw new Error("S3 bucket name is not configured")
  }
  return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${userUploadsBucket}/${key}`
} 