# TypeScript 練習題目 - 商品管理系統

## 題目概述

這是一個基於 Vue 3 和 TypeScript 的商品管理系統練習題目。專案保留了完整的 Vue 功能邏輯，但移除了 TypeScript 的型別註解，讓學習者專注於 TypeScript 語法的練習。

## 學習目標

- 練習 TypeScript 基本語法
- 理解型別註解的使用
- 學習介面 (Interface) 定義
- 熟練泛型 (Generic) 的應用
- 掌握函式型別定義

## 練習要求

### 必須完成的檔案：

1. **`src/types/product.ts`** - 商品相關型別定義
2. **`src/api/products.ts`** - API 函式型別註解
3. **`src/views/ProductManagement.vue`** - 商品管理頁面（script 部分）
4. **`src/components/ProductModal.vue`** - 商品彈窗組件（script 部分）

### 練習重點：

1. **型別定義**：為商品資料、API 回應等定義準確的型別
2. **函式型別**：為所有函式加上參數和回傳值型別
3. **組合函式**：理解 Vue 3 組合式 API 的 TypeScript 用法
4. **泛型應用**：在 API 請求和回應中使用泛型

## 開始練習

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

### 3. 檢查 TypeScript 編譯

```bash
npm run type-check
```

## 練習提示

### 商品資料結構

商品包含以下欄位：

- `id`: 商品 ID (字串)
- `title`: 商品名稱 (字串)
- `category`: 商品分類 (字串)
- `origin_price`: 原價 (數字)
- `price`: 售價 (數字)
- `unit`: 單位 (字串)
- `description`: 商品描述 (字串)
- `content`: 商品內容 (字串)
- `is_enabled`: 是否啟用 (數字：0 或 1)
- `imageUrl`: 主要圖片網址 (字串)
- `imagesUrl`: 其他圖片網址陣列 (字串陣列)
- `num`: 數量 (數字)

### API 回應結構

API 回應通常包含：

- `success`: 是否成功 (布林值)
- `message`: 訊息 (字串) - 用於新增/編輯/刪除
- `products`: 商品列表 (商品陣列) - 用於取得商品列表
- `pagination`: 分頁資訊 - 用於取得商品列表
- `imageUrl`: 圖片網址 (字串) - 用於圖片上傳

## 練習步驟

### 第一步：型別定義 (src/types/product.ts)

1. 將所有 `unknown` 替換為正確的型別
2. 定義 `ProductData` 介面的所有屬性
3. 完成其他介面和型別的定義

### 第二步：API 函式 (src/api/products.ts)

1. 匯入需要的型別定義
2. 為所有函式參數加上型別註解
3. 確保回傳值型別正確

### 第三步：組合函式

1. **useProductData.ts**：完成商品表單相關型別
2. **useImageUpload.ts**：完成圖片上傳相關型別

### 第四步：Vue 組件

1. **ProductManagement.vue**：完成商品管理頁面型別
2. **ProductModal.vue**：完成商品彈窗組件型別

## 驗證方式

1. **編譯檢查**：確保 `npm run type-check` 通過
2. **功能測試**：確保商品管理功能正常運作
3. **型別提示**：在 VS Code 中應該有完整的型別提示

## 檢查清單

- [ ] 所有 `unknown` 型別都已替換
- [ ] 所有函式都有參數和回傳值型別
- [ ] 沒有 TypeScript 編譯錯誤
- [ ] VS Code 有正確的型別提示
- [ ] 程式功能正常運作

## 常見問題

### Q: 如何定義可選屬性？

A: 在屬性名後加上 `?`，例如：`name?: string`

### Q: 如何定義陣列型別？

A: 使用 `Type[]` 或 `Array<Type>`，例如：`string[]` 或 `Array<string>`

### Q: 如何定義函式型別？

A: 使用箭頭函式語法：`(param: Type) => ReturnType`

### Q: 如何使用泛型？

A: 在型別名稱後加上 `<T>`，例如：`Promise<ResponseType>`

## 解答檢查

完成練習後，可以參考 `answers/` 資料夾中的解答檔案。

---

## 專案結構說明

```
src/
├── types/         # 型別定義檔案
├── api/           # API 請求函式
├── composable/    # Vue 組合式 API
├── components/    # Vue 組件
└── views/         # 頁面組件
```
