# 新知網練習
這是一個似乎沒做完的練習專案，使用 Express、Sequelize、Vue、Pinia 搭配而成。

## 後端：backend
後端的原始碼存放於 `backend` 資料夾內。
> [!IMPORTANT]
> 請預先安裝好 MySQL、Node.js。
1. 安裝 NPM 套件：
   ```bash
   cd backend
   npm install
   ```
2. 複製 `.env.example` 並重新命名為 `.env`
3. 在 `.env` 內填入所有參數：
   ```env
   DB_NAME=<資料庫名稱>
   DB_USER=<資料庫使用者名稱>
   DB_PASSWORD=<資料庫使用者密碼>
   JWT_SECRET=<JWT加密用密鑰>
   ```
> [!IMPORTANT]
> `.env` 檔內包含加密用金鑰，請謹慎儲存 `.env`，避免外流！
4. 初始化資料庫：
   ```bash
   npm run syncdb
   ```
5. 啟動伺服器：
   ```bash
   npm run start
   ```
啟動後，可從 http://localhost:3030 存取網頁及 API。

## 前端：frontend
後端的原始碼存放於 `backend/ncufresh-practice` 資料夾內。
1. 安裝 NPM 套件：
   ```bash
   cd backend/ncufresh-practice
   npm install
   ```
2. 編譯並取得靜態檔案：
   ```bash
   npm run build
   ```
   編譯後的檔案會存放於 `dist` 資料夾內。
3. 複製 `dist` 資料夾，並直接貼上至 `backend` 資料夾後，改名為 `public`。
