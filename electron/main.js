import { app, BrowserWindow, ipcMain } from 'electron'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'

// In dev: project root is one level up from electron/
// In prod (asar:false): app is at release/win-unpacked/resources/app/electron/
//   so project root is 5 levels up: electron/ -> app/ -> resources/ -> win-unpacked/ -> release/ -> project root
const projectRoot = isDev
  ? path.join(__dirname, '..')
  : path.join(__dirname, '../../../../..')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Unboxed TCG Dashboard',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  win.setMenuBarVisibility(false)

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(projectRoot, 'dist/index.html'))
  }
}

ipcMain.handle('get-version', () => app.getVersion())

ipcMain.on('update-app', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)

  event.sender.send('update-status', { status: 'building', msg: 'Building app...' })

  exec('npm run build', { cwd: projectRoot }, (err, stdout, stderr) => {
    if (err) {
      event.sender.send('update-status', { status: 'error', msg: stderr || err.message })
    } else {
      event.sender.send('update-status', { status: 'success', msg: 'Done! Reloading...' })
      setTimeout(() => {
        if (win && !win.isDestroyed()) {
          win.loadFile(path.join(projectRoot, 'dist/index.html'))
        }
      }, 1200)
    }
  })
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
