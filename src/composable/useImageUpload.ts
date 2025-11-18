import { apiUploadImage } from '@/api/products'
import { ref, type Ref } from 'vue'

interface UseImageUploadResult {
  uploadedImages: Ref<string[]>
  imageUrlInput: Ref<string>
  fileNameDisplay: Ref<string>
  fileToUpload: Ref<File | null>
  isUploading: Ref<boolean>
  addImageUrl: () => void
  handleFileChange: (event: Event) => void
  triggerUpload: () => Promise<void>
  deleteImage: (index: number) => void
  resetImages: (newImages?: string[]) => void
}

const MAX_IMAGES = 4

function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch (e) {
    return false
  }
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file-to-upload', file)

  try {
    const res = await apiUploadImage(formData)

    return res.data.imageUrl
  } catch (error) {
    alert('上傳圖片失敗')
    throw error
  }
}

export function useImageUpload(initialImages: string[] = []): UseImageUploadResult {
  const uploadedImages: Ref<string[]> = ref([...initialImages])
  const imageUrlInput: Ref<string> = ref('')
  const fileNameDisplay: Ref<string> = ref('未選擇檔案。')
  const fileToUpload: Ref<File | null> = ref(null)
  const isUploading: Ref<boolean> = ref(false)

  const resetImages = (newImages: string[] = []): void => {
    uploadedImages.value = [...newImages].filter(Boolean)
    imageUrlInput.value = ''
    fileNameDisplay.value = '未選擇檔案。'
    fileToUpload.value = null
    isUploading.value = false
  }

  const addImageUrl = (): void => {
    const url = imageUrlInput.value.trim()
    if (!url) return

    if (uploadedImages.value.length >= MAX_IMAGES) {
      alert(`最多只能上傳 ${MAX_IMAGES} 張圖片`)
      return
    }

    if (!isValidUrl(url)) {
      alert('請輸入有效的圖片 URL 格式 (需包含 http:// 或 https://)')
      return
    }

    uploadedImages.value.push(url)
    imageUrlInput.value = ''
  }

  /**
   * 處理檔案輸入：僅儲存檔案實例並顯示名稱，不立即上傳。
   */
  const handleFileChange = (event: Event): void => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    input.value = ''

    if (!file) {
      fileNameDisplay.value = '未選擇檔案。'
      fileToUpload.value = null
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('請選擇有效的圖片檔案！')
      fileNameDisplay.value = '未選擇檔案。'
      fileToUpload.value = null
      return
    }

    if (uploadedImages.value.length >= MAX_IMAGES) {
      alert(`最多只能上傳 ${MAX_IMAGES} 張圖片！`)
      fileNameDisplay.value = '圖片數量已達上限，請先刪除圖片。'
      fileToUpload.value = null
      return
    }

    fileToUpload.value = file
    fileNameDisplay.value = file.name
  }

  const triggerUpload = async (): Promise<void> => {
    const file = fileToUpload.value

    if (!file) {
      alert('請先選擇圖片檔案')
      return
    }

    if (isUploading.value) {
      return
    }

    try {
      isUploading.value = true

      const imageUrl = await uploadFile(file)

      uploadedImages.value.push(imageUrl)

      fileToUpload.value = null
      fileNameDisplay.value = '未選擇檔案。'

      alert('圖片上傳成功！')
    } catch (error) {
      console.error('圖片上傳失敗:', error)
      alert('圖片上傳失敗，請稍後再試。')
    } finally {
      isUploading.value = false
    }
  }

  const deleteImage = (index: number): void => {
    uploadedImages.value.splice(index, 1)
  }

  return {
    uploadedImages,
    imageUrlInput,
    fileNameDisplay,
    fileToUpload,
    isUploading,
    addImageUrl,
    handleFileChange,
    triggerUpload,
    deleteImage,
    resetImages,
  }
}
