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

  let xzqhs :scxzqh.Xzqh[] = [];
  await scxzqh.sc_xzqh_parse(browser,"http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/51.html", xzqhs);

  console.log(xzqhs);

  await browser.close();
};


if (require.main === module) {
  main(process.argv);
}