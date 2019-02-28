#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
import * as p from "commander";
import * as scxzqh from "./scxzqh";
import * as xhzd from "./xhzd";
import * as sg from "./sg";

const config = require('./config');

p.version('1.0.0')
  .usage(`${process.argv0}\n`)
  .option("-c,--cmd <xhzd|scxzqh|sg>")
  .option("-z,--hanzi <hanzi>");

p.parse(process.argv);

async function main(argv: string[]) {
    spider().catch((error) => {
        console.error('CATCH ERROR: ', error);
        process.exit(1);
    });
}

const spider = async () => {
  const browser = await puppeteer.launch(config.puppeteer);
  switch(p.cmd){
    case "scxzqh":
      const xzqhs = await scxzqh.parse_sc_xzqh(browser);
      console.log(xzqhs);
      break;
    case "xhzd":
      console.log("hanzi:"+p.hanzi);  
      const result = await xhzd.parse_xhzd(browser, p.hanzi);
      console.log(result);
      break;
    case "sg":
      console.log("sg");  
      await sg.run(browser);
  }

  await browser.close();
};


if (require.main === module) {
  main(process.argv);
}