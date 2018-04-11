const electron = require('electron')
// Module to control application life.
const {app, Menu} = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipcMain = require("electron").ipcMain;

let mainWindow

const createWindow = () => {
  installMenu()
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true
  })

  // and load the Outlook of the app.
  mainWindow.loadURL("https://outlook.office.com/owa/");

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('new-window', handleRedirect);

}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Open link by your default browser
const handleRedirect = (e, url) => {
  if(mainWindow.webContents.getURL() !== "https://outlook.office.com/owa/?path=/calendar/view/WorkWeek") {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  }
}


app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

const menuTemplate = [
  {
    label: 'OutlookWeb',
    submenu: [
      {
        role: 'quit',
        label: "Quit OutlookWeb"
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'},
      {role: 'quit'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {type: 'separator'},
      {role: 'togglefullscreen'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
}];

const installMenu = () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  if(process.platform == 'darwin') {
    Menu.setApplicationMenu(menu);
  } else {
    mainWindow.setMenu(menu);
  }
}