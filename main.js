const { app, Menu, Tray, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } = require('electron')

let win = null
const createWindow = () => {
    win = new BrowserWindow({
        fullscreen: true,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false
        },
        transparent: true,
        frame: false,
        //resizable: false,
        alwaysOnTop: true
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
})