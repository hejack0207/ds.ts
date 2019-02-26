#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
import * as p from "commander";
import * as scxzqh from "./scxzqh";
import * as xhzd from "./xhzd";

const config = require('./config');

p.version('1.0.0')
  .usage(`${process.argv0}\n`)
  .option("-c,--command <xhzd|scxzqh>")
  .option("-z,--hanzi hanzi");

p.parse(process.argv);
console.log("hanzi:"+p.hanzi);  

async function main(argv: string[]) {
    spider().catch((error) => {
        console.error('CATCH ERROR: ', error);
        process.exit(1);
    });
}

const spider = async () => {
  const browser = await puppeteer.launch(config.puppeteer);
  switch(p.command.name){
    case "scxzqh":
      const xzqhs = await scxzqh.parse_sc_xzqh(browser);
      console.log(xzqhs);
      break;
    case "xhzd":
      await xhzd.parse_xhzd(browser, p.hanzi);
      break;
  }

  await browser.close();
};


if (require.main === module) {
  main(process.argv);
}