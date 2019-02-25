#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
import * as scxzqh from "./scxzqh";

const config = require('./config');
  
async function main(argv: string[]) {
  spider().catch((error) => {
      console.error('CATCH ERROR: ', error);
      process.exit(1);
  });
}

const spider = async () => {
  const browser = await puppeteer.launch(config.puppeteer);
  const xzqhs = await scxzqh.sc_xzqh_parse(browser);

  console.log(xzqhs);
  await browser.close();
};


if (require.main === module) {
  main(process.argv);
}