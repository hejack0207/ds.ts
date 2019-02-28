'use strict';

import * as puppeteer from "puppeteer";
const config = require('./config');
  
export const run = async (browser: puppeteer.Browser) => {

  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);

  let url="http://172.16.0.251:81/";

//  await browser.on('targetcreated', async () => {
//    console.log('On targetcreated!');
//    const foundPage = await changePage(url);
//    if(foundPage) {
//        console.log('Found new page.');
//        await foundPage.screenshot({path: "/tmp/sg.png"});
//    } else {
//        console.log('Failed to find new page.');
//    }
//  });

  await page.goto(url);
//  const popup = await browser.waitForTarget(target => target.url() === url);

//  async function changePage(url: string){
//    let pages = await browser.pages();
//    let popup = page;
//    for(let i = 0; i < pages.length; i += 1) {
//        if(pages[i].url() === url) {
//            popup = pages[i];
//            console.log(`page for url ${url} found, index is ${i}`);
//            break;
//        }
//    }
//    return popup;
//  }

//  await page.on('dialog', async () => {
//    console.log('On dialog!');
//    const foundPage = await changePage(url);
//    if(foundPage) {
//        console.log('Found new page.');
//        await foundPage.screenshot({path: "/tmp/sg.png"});
//    } else {
//        console.log('Failed to find new page.');
//    }
//  });

//  const pages = await browser.pages(); // get all open pages by the browser
//  console.log(`pages total: ${pages.length}`);
//  const popup = pages[pages.length - 1]; // the popup should be the last page opened
//  await page.screenshot({path: "/tmp/sg0.png"});
//  await popup.screenshot({path: "/tmp/sg1.png"});

//  await page.waitForSelector("#wd");
//  await page.type("#wd", hanzi);
//  await page.click("#zisubmit");
//  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await browser.close();
  return "abc";
};