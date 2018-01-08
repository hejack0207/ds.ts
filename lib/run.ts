#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
//const puppeteer = require('puppeteer');
const config = require('./config');
  
const run = async () => {

  var p = require('commander');
  p.version('1.0.0')
    .usage('cmd\n E.g. xhzd -z hanzi\n')
    .option("-z,--hanzi <hanzi>","specify hanzi to search")
    .option("-b,--brief","enable brief output")
    .option("-e,--expl","enable explanation output")
    .option("-f,--folk","enable folk output")
    .option("-g,--glyph","enable glyph output")
    .option("-p,--phonation","enable phonation output")
  p.parse(process.argv);
  console.log(p.hanzi+"\n");

  const browser = await puppeteer.launch(config.puppeteer);
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  await page.goto("http://tool.httpcn.com/Zi/");

  await page.waitForSelector("#wd");

  await page.type("#wd", p.hanzi);
  await page.click("#zisubmit");
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  const brief_output = await page.$eval('.text15',e => e.innerText);
  const folk_output = await page.$eval('#div_a1 > div:nth-child(7)',e => e.innerText);
  const glyph_output = await page.$eval('#div_a1 > div:nth-child(8)',e => e.innerText)
  const expla_output = await page.$eval('#div_a1 > div:nth-child(9)',e => e.innerText)
  const phonation_output = await page.$eval('#div_a1 > div:nth-child(10)',e => e.innerText)
  var definition = { brief : brief_output, folk : folk_output, glyph : glyph_output, expla : expla_output, phonation : phonation_output };
  //console.log('definition:%j',definition);
  p.brief && console.log(brief_output+"\n");
  p.folk && console.log(folk_output);
  p.glyph && console.log(glyph_output);
  p.expl && console.log(expla_output);
  p.phonation && console.log(phonation_output);
  //console.log('definition:',JSON.stringify(definition, null, 2));

  //await page.screenshot({ path: './dev-images/xhzd.png' });
  //console.log('png saved!');

  await browser.close();
};

export async function main(argv: string[]) {
  run().catch((error) => {
      console.error('CATCH ERROR: ', error);
      process.exit(1);
  });
}

if (require.main === module) {
  main(process.argv);
}