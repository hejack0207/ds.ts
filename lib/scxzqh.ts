#!/usr/bin/env node
'use strict';

import * as puppeteer from "puppeteer";
const config = require('./config');
  
export const sc_xzqh_parse = async (browser: puppeteer.Browser, page :puppeteer.Page, page_url :string, xzqhs :Xzqh[]) => {
  await page.goto(page_url);

  let xzqh :Xzqh;
  if (page_url.endsWith("51.html")){
    for (let index = 2; index <= 22; index++) {
        const sdm = await page.$eval('body > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child('+index+') > td:nth-child(1) > a',e => e.textContent);
        const sname = await page.$eval('body > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child('+index+') > td:nth-child(2) > a', e => e.textContent);
        const url = await page.$eval('body > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child('+index+') > td:nth-child(2) > a', e => e.getAttribute('href'));

        // console.log('daima:'+sdm+",name:"+sname);
        let page_dir = page_url.substring(0, page_url.lastIndexOf("/"));
        xzqh = { code: sdm, name: sname, level:1, parent: '510000', children: [], href: page_dir + "/" +url};
        parse_sc_xzqh(browser, xzqh);
        xzqhs.push(xzqh);
    }
  }
}

async function parse_sc_xzqh(browser: puppeteer.Browser, xzqh :Xzqh){
  console.log("parsing "+xzqh.href);
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);
  await page.goto(xzqh.href);

  switch(xzqh.level){
    case 1:
        page.$$eval('.countytr', trs => {
          trs.forEach(tr => {
            let e: Xzqh = {
              name: tr.textContent || '',
              code: '',
              href: '',
              level: 2,
              parent: '',
              children: []
            }
            xzqh.children.push(e);
          })
        });
        break;
    case 2:
        break;
  }
}

export interface Xzqh {
  code: string;
  name: string;
  level: number;
  parent: string;
  href: string,
  children: Xzqh[]
}
