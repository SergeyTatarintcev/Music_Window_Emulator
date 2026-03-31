# 🎵 Music Window Emulator

Мини-виджет поверх экрана для управления Яндекс Музыкой.
Показывает текущий трек и даёт управление без открытия основного окна.

## Возможности
- Отображение названия трека и артиста
- Кнопки: вперёд / назад / пауза / плей
- Кнопка лайк
- Окно всегда поверх всех (always-on-top)

## Стек
- Electron (Node.js)
- HTML + CSS + JavaScript
- PowerShell UI Automation (чтение окна ЯМузыки)

## Прогресс

### ✅ Шаг 1 — Подготовка окружения
- Node.js v22, npm v10 установлены
- Electron установлен
- Структура проекта создана

### 🔄 Шаг 2 — Базовое окно Electron (в процессе)

## Структура проекта
```
Music_Window_Emulator/
├── src/
│   ├── renderer/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   ├── main.js
│   └── preload.js
├── docs/
├── .gitignore
├── package.json
└── README.md
```

## Установка и запуск
```bash
npm install
npm start
```