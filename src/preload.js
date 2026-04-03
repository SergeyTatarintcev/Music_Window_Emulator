const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  onTrackUpdate: (callback) => {
    ipcRenderer.on('track-update', (event, data) => callback(data))
  }
})