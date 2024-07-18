import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

// Get the path to the directory containing the executable
const appPath = app.getPath('exe');
const appDir = path.dirname(appPath);
const configFilePath = path.join(appDir, 'config.json');

interface Config {
    url: string;
}
// Default configuration
const defaultConfig: Config = {
    url: "https://9ndjthbw-3000.asse.devtunnels.ms/"
};

// Ensure the configuration file exists
if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
}



// Read the configuration file
let config: Config;
try {
    const configFile = fs.readFileSync(configFilePath, 'utf-8'); // Specify encoding to get a string
    config = JSON.parse(configFile);
} catch (error) {
    console.error('Failed to read the configuration file:', error);
    config = defaultConfig; // Fallback to default config in case of error
}

// Prepare the renderer once the app is ready
app.on('ready', () => {
    const url = config.url;

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
        const url = config.url;

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
