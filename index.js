const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR = 404;
const PORT = '3000';
// Utilitários
const users = [];

// Funções

const readFiles = async () => {
  const file = await fs.readFile('talker.json', 'utf8');
  return JSON.parse(file);
};

const token = () => crypto.randomBytes(8).toString('hex');

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  response.status(HTTP_OK_STATUS).send(await readFiles());
});

app.get('/talker/:id', async (request, response) => {
  const arrayTalkers = await readFiles();
  const { id } = request.params;
  const filteredTalkers = arrayTalkers.find((talker) => Number(id) === talker.id);
  if (!filteredTalkers) {
    return response.status(HTTP_ERROR)
      .json({ message: 'Pessoa palestrante não encontrada' });
  } return response.status(HTTP_OK_STATUS)
    .json(filteredTalkers);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  users.push(email, password);
  return response.status(HTTP_OK_STATUS).json({ token: token() });
});

app.listen(PORT, () => {
  console.log('Online');
});
