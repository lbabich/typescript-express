import * as path from "path";
import * as fs from 'fs';

export async function fileLoader() {
    const processPath = await path.resolve(process.cwd(), 'config/message.json');
    const dataBuffer = fs.readFileSync(processPath);
    const dataString = await dataBuffer.toString('utf-8');
    Promise.reject(new Error('This is an error'));
    return await JSON.parse(dataString);
}