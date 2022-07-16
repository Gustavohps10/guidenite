const { app, Menu, Tray, BrowserWindow, globalShortcut } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false
         }
        //  transparent: true,
        //  frame: false,
        // resizable: false
    })
  
    win.loadFile('index.html')

    /*win.on('close', event => {
        event.preventDefault()
        win.hide()
    })*/
}

app.whenReady().then(() => {
    createWindow();
})