const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('get-version'),
  updateApp: (onStatus) => {
    ipcRenderer.removeAllListeners('update-status')
    ipcRenderer.on('update-status', (_, data) => onStatus(data))
    ipcRenderer.send('update-app')
  },
})
