import fs from 'fs';

export default class Log {
    logFile: string;
    constructor(logFile: string) {
        this.logFile = logFile;
    }
    write(message: string): void {
        const actualDate = new Date().toISOString();
        const log = `[${actualDate}] ${message}\n`;
        fs.appendFile(`./logs/${this.logFile}`, log, (error) => {
            if (error) {
                console.error('Error writing the log:', error);
            }
        });
    }
}