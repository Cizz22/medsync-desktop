"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// Default configuration
const defaultConfig = {
    medsync_client_url: "https://9ndjthbw-3000.asse.devtunnels.ms/"
};
const configPath = path_1.default.join(path_1.default.dirname(__dirname), 'extraResources', 'config.json');
let config;
try {
    config = JSON.parse((0, fs_1.readFileSync)(configPath, 'utf-8'));
}
catch (error) {
    console.error('Failed to read the configuration file:', error);
    config = defaultConfig; // Fallback to default config in case of error
}
electron_1.app.on('ready', () => {
    const url = config.medsync_client_url;
    const mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 1050,
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
        const url = config.medsync_client_url;
        const mainWindow = new electron_1.BrowserWindow({
            width: 1200,
            height: 1050,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: false,
            },
        });
        mainWindow.loadURL(url);
    }
});
