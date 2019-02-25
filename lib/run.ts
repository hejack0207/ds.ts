#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
import * as scxzqh from "./scxzqh";

const config = require('./config');
  
export async function main(argv: string[]) {
  scxzqh.sc_xzqh().catch((error) => {
      console.error('CATCH ERROR: ', error);
      process.exit(1);
  });
}

if (require.main === module) {
  main(process.argv);
}