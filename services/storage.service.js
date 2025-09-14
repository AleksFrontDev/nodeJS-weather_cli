import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    try {
      const file = await promises.readFile(filePath, 'utf8');
      if (file.trim()) {
        data = JSON.parse(file);
      }
    } catch (error) {
      console.error('Ошибка чтения файла:', error.message);
    }
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};
