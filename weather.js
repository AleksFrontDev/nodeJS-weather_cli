#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import dotenv from 'dotenv';

dotenv.config();

const saveToken = async (token) => {
  if (!token.length) {
    printError(' Не передан токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(' Token сохранен');
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async (city = null) => {
  try {
    const cityToUse = city || process.env.CITY || 'Москва';
    const weather = await getWeather(cityToUse);

    console.log('='.repeat(40));
    console.log(`🌤️  Погода в ${weather.name}:`);
    console.log(`🌡️  Температура: ${Math.round(weather.main.temp)}°C`);
    console.log(`💨  Ощущается как: ${Math.round(weather.main.feels_like)}°C`);
    console.log(`💧  Влажность: ${weather.main.humidity}%`);
    console.log(`📊  Давление: ${weather.main.pressure} hPa`);
    console.log(`🌬️  Ветер: ${weather.wind.speed} м/с`);
    console.log(`📝  ${weather.weather[0].description}`);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError(' Неверно указан город');
    } else if (e?.response?.status == 401) {
      printError(' Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  const cityFromArg = process.argv[2];

  if (args.h) {
    printHelp();
    return;
  }

  if (args.s) {
    // Сохранить город
    return;
  }

  if (args.t) {
    if (!args.t || args.t === true) {
      printError(' Не передан токен. Используйте: -t [YOUR_API_TOKEN]');
      return;
    }
    saveToken(args.t);
    getForcast();
    return;
  }

  if (cityFromArg && !cityFromArg.startsWith('-')) {
    getForcast(cityFromArg);
  } else {
    getForcast();
  }
};

initCLI();
