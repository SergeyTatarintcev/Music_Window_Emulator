require('dotenv').config()
const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')

let win

// Создаём локальный сервер
function startServer() {
  const server = express()
  server.use(express.json())

  // Разрешаем запросы от браузера (CORS)
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
    next()
  })

  server.options('/track', (req, res) => res.sendStatus(200))

  // Принимаем данные от Tampermonkey
  server.post('/track', (req, res) => {
    const { track, artist } = req.body
    console.log(`🎵 ${track} — ${artist}`)

    if (win) {
      win.webContents.send('track-update', { track, artist })
    }

    res.sendStatus(200)
  })

  server.listen(3000, () => {
    console.log('✅ Сервер запущен на порту 3000')
  })
}

function createWindow() {
  win = new BrowserWindow({
    width: 380,
    height: 120,
    alwaysOnTop: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/renderer/index.html')
}

app.whenReady().then(() => {
  createWindow()
  startServer()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})