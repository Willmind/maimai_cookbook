import { resolveDataSource } from '@/data/repositories/dataSource'

import { getSupabaseClient } from './client'
import { compressImageFile } from './imageCompression'

export type ImageBucket = 'recipe-covers' | 'cooking-log-photos'

const mockPathByBucket: Record<ImageBucket, string> = {
  'recipe-covers': 'mock/cover-demo.webp',
  'cooking-log-photos': 'mock/dish-demo.webp',
}

export function safeFileName(fileName: string) {
  const normalized = fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '')
  return normalized || 'image'
}

export function buildImagePath(prefix: string, fileName: string, now = Date.now()) {
  return `${prefix}/${now}-${safeFileName(fileName)}`
}

export async function uploadImage(bucket: ImageBucket, file: File | undefined, pathPrefix: string) {
  if (resolveDataSource() === 'mock') {
    return mockPathByBucket[bucket]
  }

  if (!file) {
    throw new Error('请选择一张图片后再上传。')
  }

  const uploadFile = await compressImageFile(file)
  const path = buildImagePath(pathPrefix, uploadFile.name)
  const { error } = await getSupabaseClient().storage.from(bucket).upload(path, uploadFile, {
    cacheControl: '3600',
    upsert: false,
    contentType: uploadFile.type || 'image/jpeg',
  })

  if (error) throw error

  return path
}

export async function deleteImage(bucket: ImageBucket, path: string | undefined) {
  if (!path || path.startsWith('mock/') || resolveDataSource() === 'mock') {
    return
  }

  const { error } = await getSupabaseClient().storage.from(bucket).remove([path])
  if (error) throw error
}

export function getPublicImageUrl(bucket: ImageBucket, path: string | undefined) {
  if (!path || path.startsWith('mock/')) {
    return undefined
  }

  const { data } = getSupabaseClient().storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
