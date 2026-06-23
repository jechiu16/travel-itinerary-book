<h1 align="center">🗺️ travel-itinerary-book</h1>

<p align="center">
  <b>Claude Code 技能：把一堆旅遊筆記——甚至什麼都還沒訂——變成一份查證過的、手機優先的旅遊手冊，輸出為單一 HTML 檔案。</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/授權-MIT-blue.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/Claude%20Code-技能-7C3AED" alt="Claude Code skill">
  <img src="https://img.shields.io/badge/輸出-單檔%20HTML%20%2B%20PDF-2D4F39" alt="Single-file HTML + PDF">
  <img src="https://img.shields.io/badge/手機-優先-1C305C" alt="Mobile first">
</p>

<p align="center">
  <a href="sample/hokkaido-7day-sample.html"><img src="sample/preview.png" width="420" alt="樣品行程預覽"></a><br>
  <sub>↑ 樣品輸出（航班與住宿已去識別化）— <a href="sample/hokkaido-7day-sample.html">開啟完整樣品 HTML</a></sub>
</p>

---

## 為什麼要這樣做

大多數旅遊文件不是一堵手機上看不完的連結牆，就是版面好看但資訊早就過期。這個技能兩件事一起做：**上網查證事實**，再以讓**主路線永遠可見、細節一點即開**的方式排版呈現。

## ✨ 你會得到什麼

- 📱 **手機優先、單一檔案** — 內嵌 CSS、Google Fonts，零 JS 依賴。AirDrop 傳出去，離線也能看。
- 🧭 **主動線永遠可見** — 餐廳、歷史、採買、備選方案都摺疊收好，需要才展開。
- 🔍 **上網查證事實** — 營業時間、票價、季節限定、暫停營業、搬遷。校正過的直接寫正確值，不留「原本寫錯…」的注記框。
- 📅 **時間性活動優先確認** — 那場主場比賽、那個祭典，日期真的在你的行程窗口內嗎？末班車幾點？
- 🏨 **住宿航班速覽卡** — 航班加住宿一目了然，每間飯店都連結到 Google Maps。
- 🖨️ **PDF 輸出** — 生成一份全展開的可列印版本，和手機版並存。

## 🔀 兩種模式

| 你手上有… | 技能會… |
|-----------|---------|
| **已確認的訂單** | 查證並漂亮地呈現它們 |
| **什麼都還沒訂** | 提出路線骨架，**同時給一份優先順序的待訂清單** — 先訂什麼、去哪訂、什麼時候會售完 |

部分確認的行程（例如機票訂了、飯店還沒）按項目個別處理。**未訂的項目絕不會被呈現為已確認。**

## 🚀 安裝

Clone 到你的 Claude Code 個人技能目錄：

```bash
git clone https://github.com/jechiu16/travel-itinerary-book.git \
  ~/.claude/skills/travel-itinerary-book
```

然後在任何 Claude Code 對話中輸入：

```
/travel-itinerary-book
```

…或直接說「幫我規劃 5 天京都行，我喜歡歷史和日本酒」／「把這些行程檔案整合起來，確認最新資訊」。

## 🧱 檔案說明

| 檔案 | 用途 |
|------|------|
| [`SKILL.md`](SKILL.md) | 技能主體 — 工作流程、每日結構、文字原則、常見錯誤 |
| [`research-and-factcheck.md`](research-and-factcheck.md) | 每個研究 agent 必須查證和回傳什麼；訂位優先順序 |
| [`template.html`](template.html) | 完整 CSS + 示範日（時間軸、三層歷史摺疊、A/B 二選一、住宿卡、採買區） |
| [`sample/`](sample/) | 已渲染的去識別化範例輸出 + 預覽圖 |

## 🎯 這份技能的主張

- **平實清晰的繁體中文** — 不用裝飾性的和風、令和體或壹貳參排版，那樣讀起來很躁。
- **歷史摺疊要有料** — 前因後果、必看點、真實故事、人事時地物。最多三層嵌套，深入的放深層。
- **A/B 備選放第二層摺疊** — 絕不並排在主動線上（那樣會讓人以為兩個都要做）。
- **誠實的優先標籤** — 必留 / 條件保留 / 可加 / 可砍。告訴你可以砍哪個，不只是一直加。

---

<p align="center"><sub>由 <a href="https://claude.com/claude-code">Claude Code</a> 建置 · MIT 授權</sub></p>
