import {appendFile, mkdir} from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import {format} from "date-fns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requestLogsFilePath = path.resolve(__dirname, "..", "./logs/requestLogs.txt");

export default function logRequest(req, res, next) {
    const date = format(new Date(), 'MM/dd/yyyy pp')
    const logText = `${req.method}\t${date}\t${req.url} ${req.headers.origin}\n`

    appendFile(requestLogsFilePath, logText, (err) => {
        if (err) {
            
            const requestLogsDir = path.resolve(__dirname, "..", path.dirname(requestLogsFilePath));

            mkdir(requestLogsDir, (err) => {
                console.log(err);
            });

            appendFile(requestLogsFilePath, logText, (err) => console.log(err));
        }
    })
    next()
}
