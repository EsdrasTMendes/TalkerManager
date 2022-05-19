const express = require('express');
const bodyParser = require('body-parser');
const validateLogin = require('./middleware/validateLogin');
const { token, readFiles } = require('./utils/index');
const { request } = require('express');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR = 404;
const PORT = '3000';

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

app.post('/login', validateLogin, (_request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: token() });
});

app.post('/talker', (request, response) => {
  const { name, age, talk } = request.body;
  const personTalk = {
    id: Math.max(...readFiles.map((talker) => talker.id)) + 1,
    name,
    age,
    talk,
  };
  response.status(HTTP_OK_STATUS).json('Olá Kamila');
});

app.listen(PORT, () => {
  console.log('Online');
});

// id: Math.max(...talkers.map((talker) => talker.id)) + 1;
