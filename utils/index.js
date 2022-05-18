const fs = require('fs').promises;
const crypto = require('crypto');

const token = () => crypto.randomBytes(8).toString('hex');

const readFiles = async () => {
  const file = await fs.readFile('talker.json', 'utf8');
  return JSON.parse(file);
};
module.exports = {
  token,
  readFiles,
};
