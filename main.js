const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
function createWindow(){
  const iconPath = path.join(__dirname, 'assets', 'higrosoft.png');
  const icon = nativeImage.createFromPath(iconPath);
  const win = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#f7f8fa',
    autoHideMenuBar: true, icon: icon.isEmpty()? undefined : icon,
    webPreferences: { preload: path.join(__dirname,'preload.js'), contextIsolation: true, nodeIntegration: false, devTools: false },
    show: false
  });
  win.once('ready-to-show', ()=>win.show());
  win.loadFile(path.join(__dirname, 'index.html'));
}
app.whenReady().then(()=>{ createWindow(); app.on('activate',()=>{ if(BrowserWindow.getAllWindows().length===0) createWindow();});});
app.on('window-all-closed', ()=>{ if(process.platform!=='darwin') app.quit();});