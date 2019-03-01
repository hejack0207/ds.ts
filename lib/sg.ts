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

    await page.waitForSelector("#loginid");
    await page.type("#loginid", "何龙");
    await page.type("#userpassword", "ly123qwe");
    await page.click("#login");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    /*
    await page.click("div[title='流程']");
    await page.click("#subform > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(5) > div:nth-child(1) > ul > li:nth-child(4) > a");
    */
    await page.goto("http://172.16.0.251:81/workflow/request/AddRequest.jsp?workflowid=186&isagent=0&beagenter=0");
    await page.waitForSelector("#\\24addbutton0\\24");

    await page.screenshot({path: "/tmp/sg.png"});
    await browser.close();
  }catch(e){
    console.log("error:"+e);
  }
  return "abc";
};