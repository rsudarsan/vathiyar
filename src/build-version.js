const fs = require('fs');
const version = require('../package.json').version + '';
const config = { buildTime: '' };
const newLine = '\r\n';
var now = new Date();

const endIndex = version.indexOf('.', version.indexOf('.') + 1);
config.buildTime = version.substr(0, endIndex + 1);

const start = new Date(now.getFullYear(), 0, 0);
const diff = now - start;
const oneDay = 1000 * 60 * 60 * 24;
const day = Math.floor(diff / oneDay);
const minute = now.getHours() * 60 + now.getMinutes();

config.buildTime = config.buildTime + (now.getFullYear() + '').substr(2, 2) + (day + '').padStart(3, '0') + '.' + (minute + '').padStart(4, '0');

var configContent = '';
for (const key in config) {
  if (config.hasOwnProperty(key)) {
    const element = config[key];
    configContent += 'export const ' + key + " = '" + element + "';" + newLine;
  }
}

fs.writeFileSync('src/environments/config.ts', configContent);
