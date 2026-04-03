require('dotenv').config()
const { app, BrowserWindow } = require('electron')
const path = require('path')

let win
const SESSION_ID = process.env.YANDEX_SESSION_ID
const UID = process.env.YANDEX_UID

const HEADERS = {
  'Cookie': `Session_id=${SESSION_ID}; yandexuid=${UID}`,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'X-Yandex-Music-Client': 'YandexMusicAndroid/23020251'
}

async function getCurrentTrack() {
  try {
    const response = await fetch(`https://api.music.yandex.net/users/${UID}/queues`, {
      headers: HEADERS
    })

    const data = await response.json()
    console.log('Queues response:', JSON.stringify(data).substring(0, 200))

    if (!data.result || data.result.length === 0) {
      console.log('Очередь пуста')
      return
    }

    const queueId = data.result[0].id
    const queueResponse = await fetch(`https://api.music.yandex.net/users/${UID}/queues/${queueId}`, {
      headers: HEADERS
    })

    const queue = await queueResponse.json()
    if (!queue.result) return

    const currentIndex = queue.result.currentIndex
    const trackId = queue.result.tracks[currentIndex].id

    const trackResponse = await fetch(`https://api.music.yandex.net/tracks/${trackId}`, {
      headers: HEADERS
    })

    const trackData = await trackResponse.json()
    if (!trackData.result || trackData.result.length === 0) return

    const track = trackData.result[0]
    const trackName = track.title
    const artist = track.artists.map(a => a.name).join(', ')

    console.log(`🎵 ${trackName} — ${artist}`)

    if (win) {
      win.webContents.send('track-update', { track: trackName, artist })
    }
  } catch (e) {
    console.error('❌ Ошибка:', e.message)
  }
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

  win.webContents.once('did-finish-load', () => {
    getCurrentTrack()
    setInterval(getCurrentTrack, 3000)
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})