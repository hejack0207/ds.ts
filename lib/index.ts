#!/usr/bin/env node
'use strict';

const puppeteer = require('puppeteer');
const config = require('../config');
  
const run = async () => {

  var p = require('commander');
  p.version('1.0.0')
    .usage('cmd\n E.g. xhzd -z hanzi\n')
    .option("-z,--hanzi <hanzi>");
  p.parse(process.argv);
  console.log("hanzi:"+p.hanzi);

  const browser = await puppeteer.launch(config.puppeteer);
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  await page.goto("http://tool.httpcn.com/Zi/");

  await page.waitForSelector("#wd");

  await page.type("#wd", p.hanzi);
  await page.click("#zisubmit");
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.screenshot({ path: './dev-images/xhzd.png' });
  
  const brief = await page.$eval('.text15',e => e.innerText);
  const folk = await page.$eval('#div_a1 > div:nth-child(7)',e => e.innerText);
  const glyph = await page.$eval('#div_a1 > div:nth-child(8)',e => e.innerText)
  const expla = await page.$eval('#div_a1 > div:nth-child(9)',e => e.innerText)
  const phonation = await page.$eval('#div_a1 > div:nth-child(10)',e => e.innerText)
  var definition = { brief : brief, folk : folk, glyph : glyph, expla : expla, phonation : phonation };
  //console.log('definition:%j',definition);
  console.log('definition:',JSON.stringify(definition, null, 2));

  console.log('png saved!');

  await browser.close();
};

run().catch((error) => {
    console.error('CATCH ERROR: ', error);
    process.exit(1);
});

module.exports = {
  run,
};
