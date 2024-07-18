"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Get the path to the directory containing the executable
const appPath = electron_1.app.getPath('exe');
const appDir = path_1.default.dirname(appPath);
const configFilePath = path_1.default.join(appDir, 'config.json');
// Default configuration
const defaultConfig = {
    url: "https://9ndjthbw-3000.asse.devtunnels.ms/"
};
// Ensure the configuration file exists
if (!fs_1.default.existsSync(configFilePath)) {
    fs_1.default.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
}
// Read the configuration file
let config;
try {
    const configFile = fs_1.default.readFileSync(configFilePath, 'utf-8'); // Specify encoding to get a string
    config = JSON.parse(configFile);
}
catch (error) {
    console.error('Failed to read the configuration file:', error);
    config = defaultConfig; // Fallback to default config in case of error
}
// Prepare the renderer once the app is ready
electron_1.app.on('ready', () => {
    const url = config.url;
    const mainWindow = new electron_1.BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        const url = config.url;
        const mainWindow = new electron_1.BrowserWindow({
            width: 1440,
            height: 900,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: false,
            },
        });
        mainWindow.loadURL(url);
    }
});
