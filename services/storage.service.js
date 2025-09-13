import { homedir } from 'os';
import { join } from 'path';

const filePath = join(homedir(), 'weather-data.json');

export const saveKeyValue = (key, value) => {};
