const express = require('express');
const bodyParser = require('body-parser');
const validateLogin = require('./middleware/validateLogin');
const validateAge = require('./middleware/validateAge');
const validateName = require('./middleware/validateName');
const validateTalk = require('./middleware/validateTalk');
const validateToken = require('./middleware/validateToken');
const validateWatchedAt = require('./middleware/validateWatchedAt');
const { token, readFiles, writeFiles } = require('./utils/index');

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

app.post(
  '/talker',
  validateToken,
  validateName,
  validateTalk,
  validateAge,
  validateWatchedAt,
  async (request, response) => {
    const { name, age, talk } = request.body;
    const talkerJson = await readFiles();
    const personTalk = {
      id: Math.max(...talkerJson.map((talker) => talker.id)) + 1,
      name,
      age,
      talk,
    };
    talkerJson.push(personTalk);
    await writeFiles(talkerJson);
    response.status(201).json(personTalk);
  },
);

app.put('/talker/:id',
validateToken,
validateName,
validateTalk,
validateAge,
validateWatchedAt,
async (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;
  const personsTalkers = await readFiles();
  const index = personsTalkers.findIndex((person) => person.id === Number(id)); // encontrando indice
  personsTalkers[index] = { ...personsTalkers[index], name, age, talk }; // reescreveendo no objeto
  await writeFiles(personsTalkers); // escrevendo no talker.json
  response.status(200).json(personsTalkers[index]);
});

app.delete('/talker/:id',
validateToken,
async (request, response) => {
  const { id } = request.params;
  const personsTalkers = await readFiles();
  const newPersonsTalkers = personsTalkers.filter((person) => person.id !== Number(id)); 
  await writeFiles(newPersonsTalkers);
  response.status(204).json(newPersonsTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});

// id: Math.max(...talkers.map((talker) => talker.id)) + 1;
