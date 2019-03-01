'use strict';

import * as puppeteer from "puppeteer";
import { watchFile } from "fs";
const config = require('./config');
  
export const run = async (browser: puppeteer.Browser) => {

  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  let url="http://172.16.0.251:81/login/Login.jsp?logintype=1";

  try{
    await page.goto(url);
    //await new Promise(x => setTimeout(x, 3000));
    await page.screenshot({path: "/tmp/sg.png"});
  }catch(e){
    console.log("error:"+e);
  }

//  await page.waitForSelector("#wd");
//  await page.type("#wd", hanzi);
//  await page.click("#zisubmit");
//  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await browser.close();
  return "abc";
};