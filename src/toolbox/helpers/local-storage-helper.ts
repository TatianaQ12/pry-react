/* eslint-disable */
import { KEY_LOCAL_STORAGE } from '../constants/local-storage'
import CryptoJS from 'crypto-js'
import { LocalStorageKey } from '@/types'

export function saveLocalStorage(KEY_SECRET: LocalStorageKey, body: any | string | null) {
  const chiperText = CryptoJS.AES.encrypt(
    JSON.stringify(body), KEY_LOCAL_STORAGE
  ).toString()
  localStorage.setItem(KEY_SECRET,chiperText)
}

export function removeLocalStorage(KEY_SECRET: string) {
  localStorage.removeItem(KEY_SECRET)
}
export function readLocalStorage(KEY_SECRET: LocalStorageKey) {
  try {
    const chiperText   = localStorage.getItem(KEY_SECRET)
    const bytes        = CryptoJS.AES.decrypt(chiperText || '', KEY_LOCAL_STORAGE)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    return JSON.parse(originalText)
  } catch (e) {
    return null
  }
}
