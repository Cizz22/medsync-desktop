// Packages
import { BrowserWindow, app } from 'electron'
import { readFileSync } from 'fs';
import path from 'path';

interface config {
    medsync_client_url: string
}

// Default configuration
const defaultConfig = {
    medsync_client_url: "https://9ndjthbw-3000.asse.devtunnels.ms/"
};

const configPath = path.join(path.dirname(__dirname), 'extraResources', 'config.json');

let config: config;
try {
    config = JSON.parse(readFileSync(configPath, 'utf-8'));
} catch (error) {
    console.error('Failed to read the configuration file:', error);
    config = defaultConfig; // Fallback to default config in case of error
}

app.on('ready', () => {
    const url = config.medsync_client_url;

    const mainWindow = new BrowserWindow({
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
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        const url = config.medsync_client_url;

        const mainWindow = new BrowserWindow({
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