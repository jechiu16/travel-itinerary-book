<h1 align="center">🗺️ travel-itinerary-book</h1>

<p align="center">
  <b>Claude Code 技能：把旅遊筆記、半成形想法，或完全未訂的旅行，變成一份會先發散、再收斂確認、最後查證整合的手機優先旅遊手冊。</b>
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

大多數旅遊文件不是一堵手機上看不完的連結牆，就是版面好看但資訊早就過期。這個技能把規劃過程拆成一個穩定循環：**先發散路線可能性，再總結取捨、確認骨架、查證事實，最後整理成單檔 HTML**。主路線永遠可見，細節一點即開。

## ✨ 你會得到什麼

- 📱 **手機優先、單一檔案** — 內嵌 CSS、零 JS 依賴；內容離線可讀，字型有系統 fallback。
- 🧭 **主動線永遠可見** — 餐廳、歷史、採買、備選方案都摺疊收好，需要才展開。
- 🔀 **會先發散再收斂** — 不是一開始就硬排；先比較路線、節奏、住宿移動與訂位風險，再請你確認骨架。
- 🔭 **主動發現你想不到的選項** — 不只整理你說的興趣；用確切日期、興趣的橫向延伸、在地人視角挖出前沿候選，每個都標明「要取代行程裡的誰」，由你決定加不加。
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

repo 內含 `.claude-plugin/plugin.json`，所以 clone 進技能目錄後會被當 `@skills-dir` plugin 載入；同時也具備上架 marketplace、用 `/plugin install` 版本化安裝的條件。

然後在任何 Claude Code 對話中輸入：

```
/travel-itinerary-book
```

…或直接說「幫我規劃 5 天京都行，我喜歡歷史和日本酒」／「把這些行程檔案整合起來，確認最新資訊」。

## 🧱 檔案說明

| 檔案 | 用途 |
|------|------|
| [`SKILL.md`](SKILL.md) | 技能主體 — 規劃循環、模式判斷、輸出結構、查證原則 |
| [`research-and-factcheck.md`](research-and-factcheck.md) | 研究回報格式；查證欄位、季節/週幾風險、訂位優先順序 |
| [`template.html`](template.html) | 單檔 HTML 模板 + 示範日；提供時間軸、摺疊區、住宿卡、採買區 |
| [`sample/`](sample/) | 已渲染的去識別化範例輸出 + 預覽圖 |
| [`scripts/`](scripts/) | repo 檢查與 print-copy 生成腳本 |
| [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) | plugin 中繼資料；讓 repo 能被當 Claude plugin 版本化安裝 |

## 🛠️ 開發與驗證

這個 repo 盡量維持低依賴；Node 腳本只使用標準函式庫。

```bash
npm run check
npm run sample:print
```

- `npm run check`：檢查技能 frontmatter、必要檔案、HTML 基本結構與本地連結。
- `npm run sample:print`：把範例 HTML 轉成 `dist/` 裡的全展開列印版，方便再用瀏覽器或 headless Chrome 輸出 PDF。

技能流程本身採用「發散 → 總結 → 確認 → 查證糾錯 → 組裝 → 自我檢查」循環；模型可以自由發揮內容，但在路線骨架、未訂項目、時間性活動與事實查證上保留明確護欄。

## 🎯 這份技能的主張

- **流程比風格更重要** — 先釐清旅行的骨架與風險，再決定版面語氣。
- **手機上要能立刻走路** — 主時間軸常駐，背景、食物、採買、備選放摺疊。
- **查證後直接改正** — 最終手冊只呈現目前可信的資訊，不保留除錯痕跡。
- **取捨要誠實** — 告訴旅人什麼值得留、什麼可砍、失敗時怎麼替代。
- **風格保持開放** — 用平實清楚的繁體中文；目的地、旅伴和旅行節奏會決定細節密度。

---

<p align="center"><sub>由 <a href="https://claude.com/claude-code">Claude Code</a> 建置 · MIT 授權</sub></p>
