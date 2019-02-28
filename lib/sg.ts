'use strict';

import * as puppeteer from "puppeteer";
const config = require('./config');
  
export const run = async (browser: puppeteer.Browser) => {

  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  await page.goto("http://172.16.0.251:81/");
  await page.screenshot({path: "/tmp/sg.png"});

//  await page.waitForSelector("#wd");
//  await page.type("#wd", hanzi);
//  await page.click("#zisubmit");
//  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await browser.close();
  return "abc";
};