#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError(' Не передан токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(': Token сохранен');
  } catch (e) {
    printError(': ' + e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    // Вывод help
    printHelp();
  }

  if (args.s) {
    // Сохранить город
  }

  if (args.t) {
    if (!args.t || args.t === true) {
      printError(' Не передан токен. Используйте: -t [YOUR_API_TOKEN]');
      return;
    }
    console.log(args.t);
    return saveToken(args.t);
  }

  getWeather('Moskow');

  // Вывести погоду
};

initCLI();
