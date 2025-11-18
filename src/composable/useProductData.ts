import type { ProductData } from '@/types/product'
import { ref, type Ref } from 'vue'

interface UseProductFormResult {
  form: Ref<ProductData>
  formTitle: Ref<string>
  loadProduct: (data: ProductData | null) => void
  resetForm: () => void
}

const getInitialProductData = (): ProductData => ({
  id: '',
  title: '',
  origin_price: 0,
  price: 0,
  category: '',
  unit: '',
  num: 0,
  content: '',
  description: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [''],
})

export function useProductForm(): UseProductFormResult {
  const form = ref<ProductData>(getInitialProductData())
  const formTitle = ref('新增商品')

  const loadProduct = (data: ProductData | null): void => {
    if (data) {
      // 編輯模式：載入資料
      form.value = { ...data }
      formTitle.value = '編輯商品'
    } else {
      resetForm()
    }
  }

  const resetForm = (): void => {
    form.value = getInitialProductData()
    formTitle.value = '新增商品'
  }

  return {
    form,
    formTitle,
    loadProduct,
    resetForm,
  }
}
