'use strict';

import * as puppeteer from "puppeteer";
const config = require('./config');
  
export const sc_xzqh_parse = async (browser: puppeteer.Browser):Promise<Xzqh[]> => {
  const xzqhs = [];
  const page_url = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/51.html";
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);
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
        await parse_sc_xzqh(browser, xzqh);
        xzqhs.push(xzqh);
    }
  }
  return xzqhs;
}

async function parse_sc_xzqh(browser: puppeteer.Browser, xzqh :Xzqh){
  const page = await browser.newPage();
  await page.setViewport(config.puppeteer.viewport);
  await page.goto(xzqh.href);
  console.log("parsing "+xzqh.href);
  await page.screenshot({path: "/tmp/"+xzqh.name+".png"});

  switch(xzqh.level){
    case 1:
        console.log("fetching county");
        await page.$$eval('tr.countytr', trs => {
          console.log("count:"+trs.length);
          trs.forEach(tr => {
            let e: Xzqh = {
              name: tr.textContent || '',
              code: '',
              href: '',
              level: 2,
              parent: '',
              children: []
            }
            console.log("county:"+e);
            //xzqh.children.push(e);
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
