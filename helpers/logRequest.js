import {appendFile, mkdir} from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requestLogsFilePath = path.resolve(__dirname, "..", "./logs/requestLogs.txt");

export default function logRequest(req, res, next) {

    appendFile(requestLogsFilePath, "test", (err) => {
        if (err) {
            
            const requestLogsDir = path.resolve(__dirname, "..", path.dirname(requestLogsFilePath));
            console.log(requestLogsDir)

            mkdir(requestLogsDir, (err) => {
                console.log(err);
            });

            appendFile(requestLogsFilePath, "test-inner", (err) => console.log(err));
        }
    })
    next()
}
