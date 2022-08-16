const { app, Menu, Tray, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } = require('electron')
const {spawn, exec} = require("node:child_process")

let command =  __dirname + "\\button_on_360_guide_v5\\listener.exe"

let child = spawn(command, {windowsHide: false});
child.stdout.setEncoding('utf8')

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
        resizable: false,
        alwaysOnTop: true,
        icon: __dirname + "\\src\\assets\\icons\\guidenite.png"
    })

    win.setAlwaysOnTop(true, 'screen');
    win.setMinimizable(false);
  
    win.loadFile('index.html')

    win.on('show', () => {
        setTimeout(() => {
            win.focus();
        }, 100);
    });
}

app.whenReady().then(() => {
    createWindow();
})

child.stdout.on("data",function(stdout){
    if(win.isVisible()){
        win.blur()
        win.hide()
    }else{
        win.show()
    }
})