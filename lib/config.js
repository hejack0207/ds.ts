const envConfig = require('ding-env-config');
const defaultsdeep = require('lodash.defaultsdeep');

const config = {
  puppeteer: {
    headless: process.env.NODE_ENV !== 'dev',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 10000, // 10s

    viewport: {
      width: 1920,
      height: 1080,
    },
    dumpio: false,
  },
};

if (config.isBase64) {
  config.profile.password = Buffer.from(
    config.profile.password,
    'base64',
  ).toString();
}

const envConf = envConfig();

module.exports = defaultsdeep(envConf, config);
