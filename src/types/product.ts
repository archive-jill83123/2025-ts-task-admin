// ==========================================
// TypeScript 練習題目 - 商品相關型別定義
// ==========================================

// 🎯 練習目標：
// 1. 理解 TypeScript 型別系統
// 2. 學習如何定義介面 (Interface) 和型別 (Type)
// 3. 熟悉物件型別的定義

// 📝 練習說明：
// 請為以下型別加上正確的 TypeScript 型別註解
// 提示：商品資料包含 id、名稱、價格、分類等欄位

// TODO: 定義商品基本資料型別
// 提示：商品應該包含以下欄位：
// - id: 字串型別
// - title: 字串型別 (商品名稱)
// - category: 字串型別 (商品分類)
// - origin_price: 數字型別 (原價)
// - price: 數字型別 (售價)
// - unit: 字串型別 (單位)
// - description: 字串型別 (商品描述)
// - content: 字串型別 (商品內容)
// - is_enabled: 數字型別 (是否啟用，0 或 1)
// - imageUrl: 字串型別 (主要圖片網址)
// - imagesUrl: 字串陣列型別 (其他圖片網址)
// - num: 數字型別 (數量)
export type TProductData = {
  // 在這裡加上型別定義
  id: string
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: string[]
  num: number
}

// TODO: 定義分頁資訊型別
// 提示：分頁資訊應該包含：
// - total_pages: 總頁數 (數字)
// - current_page: 當前頁數 (數字)
// - has_pre: 是否有前一頁 (布林值)
// - has_next: 是否有下一頁 (布林值)
// - category: 分類 (字串)
export type TPagination = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  total_pages: number
  current_page: number
  has_pre: boolean
  has_next: boolean
  category: string
}

// TODO: 定義建立商品參數型別
// 提示：建立商品時不需要 id 和 num 欄位
export type TCreateProductParams = Omit<TProductData, 'id'>

// TODO: 定義編輯商品參數型別
// 提示：編輯商品需要 id 和 data 物件
export type TEditProductParams = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  id: TProductData['id']
  data: Omit<TProductData, 'id'>
}

// TODO: 定義取得商品列表回應型別
// 提示：API 回應應該包含：
// - success: 是否成功 (布林值)
// - products: 商品陣列 (ProductData[])
// - pagination: 分頁資訊 (Pagination)
// - messages: 訊息陣列 (未知型別陣列)
export type TGetProductsResponse = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  products: TProductData[]
  pagination: TPagination
  messages: unknown[]
}

// TODO: 定義訊息回應基本型別
// 提示：包含 success (布林值) 和 message (字串)
type TMessageResponse = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  message: string
}

// TODO: 使用 MessageResponse 定義以下型別
// 提示：這些型別都是 MessageResponse 的別名
export type TCreateProductResponse = TMessageResponse
export type TEditProductResponse = TMessageResponse
export type TDeleteProductResponse = TMessageResponse

// TODO: 定義圖片上傳回應型別
// 提示：包含 success (布林值) 和 imageUrl (字串)
export type TUploadImageResponse = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  imageUrl: string
}
