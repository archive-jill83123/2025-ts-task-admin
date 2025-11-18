import type { TProductData } from '@/types/product'
import { ref, type Ref } from 'vue'

interface IUseProductFormResult {
  form: Ref<TProductData>
  formTitle: Ref<string>
  loadProduct: (data: TProductData | null) => void
  resetForm: () => void
}

const getInitialProductData = (): TProductData => ({
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

export function useProductForm(): IUseProductFormResult {
  const form = ref<TProductData>(getInitialProductData())
  const formTitle = ref('新增商品')

  const loadProduct = (data: TProductData | null) => {
    if (data) {
      // 編輯模式：載入資料
      form.value = { ...data }
      formTitle.value = '編輯商品'
    } else {
      resetForm()
    }
  }

  const resetForm = () => {
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
