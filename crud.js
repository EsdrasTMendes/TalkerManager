const fs = require('fs').promisse;

async function readFile(file) {
  const fileContent = await fs.readfile(file, 'utf8');
  return JSON.parse(fileContent);
}

async function writeFile(file, infos) {
  await fs.writeFile(file, JSON.stringify(infos), 'utf8', { flag: 'w' });
}

module.exports = {
  readFile,
  writeFile,
};
