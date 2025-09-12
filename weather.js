#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log('Parsed arguments:', args);
    console.log('Raw process.argv:', process.argv);
}

initCLI();
