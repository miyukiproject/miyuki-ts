import { app, BrowserWindow, ipcMain, Menu, shell } from "electron";
import { join } from "path";
import { createMenuTemplate } from "./menu";
import {
  chooseProgressDirectory,
  createNewProgressFile,
  getProgressInfo,
  loadBookProgress,
  loadExerciseProgress,
  pickProgressFilePath,
  saveExerciseProgress,
  saveProgressFilePath,
} from "./progress";

const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;

let mainWindow: BrowserWindow;

ipcMain.handle("progress:get-info", () => getProgressInfo());
ipcMain.handle("progress:pick-file-path", () => pickProgressFilePath());
ipcMain.handle("progress:set-file-path", (_event, filePath) => saveProgressFilePath(filePath));
ipcMain.handle("progress:choose-directory", () => chooseProgressDirectory());
ipcMain.handle("progress:load-book", (_event, bookId) => loadBookProgress(bookId));
ipcMain.handle("progress:load-exercise", (_event, scope) => loadExerciseProgress(scope));
ipcMain.handle("progress:save-exercise", (_event, scope, solution, state) =>
  saveExerciseProgress(scope, solution, state),
);

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const menu = Menu.buildFromTemplate(
    createMenuTemplate({
      onOpenProgressFile: async () => {
        const nextInfo = await chooseProgressDirectory();
        if (nextInfo.currentFilePath === undefined) {
          return;
        }

        if (!mainWindow.isDestroyed()) {
          mainWindow.webContents.send("progress:updated", nextInfo);
        }
      },
      onCreateProgressFile: async () => {
        const nextInfo = await createNewProgressFile();
        if (!nextInfo) {
          return;
        }

        if (!mainWindow.isDestroyed()) {
          mainWindow.webContents.send("progress:updated", nextInfo);
        }
      },
    }),
  );
  Menu.setApplicationMenu(menu);
  mainWindow.maximize();
  mainWindow.show();
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else if (isPreview) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("dist/index.html");
  } else {
    mainWindow.loadFile("dist/index.html");
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


export const mainURL = () => app.isPackaged ? `file://${join(__dirname, "../dist/index.html")}` : "http://localhost:5173/"