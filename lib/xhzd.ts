'use strict';

import * as puppeteer from "puppeteer";
const config = require('./config');
  
const xhzd = async (browser: puppeteer.Browser, hanzi: string) => {

  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  await page.goto("http://tool.httpcn.com/Zi/");

  await page.waitForSelector("#wd");

  await page.type("#wd", hanzi);
  await page.click("#zisubmit");
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  const brief_output = await page.$eval('.text15',e => e.outerHTML);
  const folk_output = await page.$eval('#div_a1 > div:nth-child(7)',e => e.outerHTML);
  const glyph_output = await page.$eval('#div_a1 > div:nth-child(8)',e => e.outerHTML)
  const expla_output = await page.$eval('#div_a1 > div:nth-child(9)',e => e.outerHTML)
  const phonation_output = await page.$eval('#div_a1 > div:nth-child(10)',e => e.outerHTML)
  var definition = { brief : brief_output, folk : folk_output, glyph : glyph_output, expla : expla_output, phonation : phonation_output };
  console.log("definition:"+definition+"\n");

  await browser.close();
};