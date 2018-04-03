const electron = require('electron')
// Module to control application life.
const {app, Menu} = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipcMain = require("electron").ipcMain;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// BrowserWindow.webContents.send( 'testMessage', 'test' );
// ipcMain.on("requestMessage", (event, message) => {
//   console.log(message);
//   event.sender.send("responseMessage", "pong");
// });

function createWindow () {
  installMenu()
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true
  })

  // and load the index.html of the app.
  mainWindow.loadURL("https://outlook.office.com/owa/");

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

const menuTemplate = [
  {
    label: 'OutlookWeb',
    submenu: [
      {role: 'quit'},
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
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
}];

function installMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  if(process.platform == 'darwin') {
    Menu.setApplicationMenu(menu);
  } else {
    mainWindow.setMenu(menu);
  }
}