const { app, Menu, Tray, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } = require('electron')
const {spawn, exec} = require("node:child_process")
const util = require('node:util');
const execPromise = util.promisify(require('node:child_process').exec);

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

    win.setAlwaysOnTop(true, 'screen-saver');
    win.setVisibleOnAllWorkspaces(true)
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

let homeButtonCommand =  __dirname + "\\button_on_360_guide_v5\\listener.exe"

let homeButtonChild = spawn(homeButtonCommand, {windowsHide: false});
homeButtonChild.stdout.setEncoding('utf8')


homeButtonChild.stdout.on("data", async function(){
    const { stdout: openWindowsStdout, stderr: openWindowsErr } = await execPromise('powershell ./shell/listOpenWindows.ps1');
    const ignoredWindows = [
        "Guidenite",
        "Microsoft Text Input Application",
        "explorer",
        "Taskmgr",
        "Code",
        "powershell"
    ]

    if(win.isVisible()){
        win.blur()
        win.hide()
        resumeBackgroundWindows(JSON.parse(openWindowsStdout), ignoredWindows)
    }else{
        suspendBackgroundWindows(JSON.parse(openWindowsStdout), ignoredWindows)
        win.show()
    }
})

function suspendBackgroundWindows(openWindows = [], ignoredWindows) {
    openWindows.forEach(window=>{
        if(
            !ignoredWindows.includes(window.MainWindowTitle)
            && !ignoredWindows.includes(window.Description)
            && !ignoredWindows.includes(window.Name)
        ){
            exec("powershell ./PSTools/pssuspend.exe " + window.Id)
        }
    })
}

function resumeBackgroundWindows(openWindows, ignoredWindows) {
    openWindows.forEach(window=>{
        if(
            !ignoredWindows.includes(window.MainWindowTitle)
            && !ignoredWindows.includes(window.Description)
            && !ignoredWindows.includes(window.Name)
        ){
            exec("powershell ./PSTools/pssuspend.exe -r " + window.Id)
        }
    })
}