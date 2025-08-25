# goodsdesign-v2.0-Tailwind3.4-Slim2-es6module

這是一套 Gulp + TailwindCSS + ES6 模組化 JavaScript 的開發環境，重點在 模組化開發，方便多人協作、功能拆分與維護。

---

## 📂 專案結構
```
project/
├─ sass/             # SCSS 原始碼
├─ src/              # JavaScript 原始碼 (ES6 模組化)
│   ├─ main.js       # 主入口
│   └─ modules/      # 各功能模組
├─ stylesheets/      # 編譯後 CSS
├─ dist/             # 編譯後 JS
├─ views/            # PHP 模板
├─ gulpfile.js
├─ package.json
└─ tailwind.config.js
```

---

## 🔧 ES6 模組化概念

### 1. 模組拆分
把功能拆成小的 JS 模組，方便管理：
```
// src/modules/math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

### 2. 模組匯入

在主入口或其他模組使用：
```
// src/main.js
import { add, multiply } from './modules/math.js';

console.log(add(2, 3));        // 5
console.log(multiply(2, 3));   // 6

```

---

## 📌 開發建議

1. 模組檔案放 src/modules/，統一管理
2. 主入口 main.js 只負責初始化與匯入模組
3. 修改模組後，必須跑 Gulp 才能生成 dist/main.js
4. 勿直接修改 dist/，以免下次編譯覆蓋
