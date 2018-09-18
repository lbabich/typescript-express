import * as path from 'path';
import * as fs from 'fs';

export async function fileLoader() {
    console.log(process.cwd());
    const processPath = await path.resolve(__dirname, '../config/message.json');
    const dataBuffer = fs.readFileSync(processPath);
    const dataString = await dataBuffer.toString('utf-8');
    // Promise.reject(new Error('This is an error'));
    return await JSON.parse(dataString);
}