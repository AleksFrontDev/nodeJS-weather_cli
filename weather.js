#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
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
    // Сохранить токен
    console.log(args.t);
    return saveToken('token', args.t);
  }

  // Вывести погоду
};

initCLI();
