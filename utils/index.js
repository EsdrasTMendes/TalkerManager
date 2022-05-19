const fs = require('fs').promises;
const crypto = require('crypto');

const token = () => crypto.randomBytes(8).toString('hex');

const readFiles = async () => {
  const file = await fs.readFile('talker.json', 'utf8');
  return JSON.parse(file);
};

const writeFiles = async (write) => {
  const data = await fs.writeFile('talker.json', JSON.stringify(write));
  return data;
};

module.exports = {
  token,
  readFiles,
  writeFiles,
};
