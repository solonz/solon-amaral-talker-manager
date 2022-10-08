const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const { 
  // writeNewTalkerData, 
  readTalkerData, newTalkerData, deleteTalkerData,
 } = require('./utils');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Leitura de dados do talker.json

// async function main() {
// const talkerData = await readTalkerData();
// console.log(talkerData);
// }
// main();

// Criação de novo dado no talker.json

// async function main2() {
//   writeNewTalkerData({
//     name: 'Solon Amaral',
//     age: 33,
//     id: Date.now(),
//     talk: { watchedAt: '19/09/1989', rate: 5 },
//   });
// }
// main2();

app.get('/talker', async (req, res) => {
const talkers = await readTalkerData();

if (talkers) {
  res.status(200).json(talkers);
} else {
  res.status(200).send([]);
} 
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const talkerId = await readTalkerData();
  const talkerIdFind = talkerId.find((e) => e.id === Number(id));

  if (talkerIdFind) {
    return res.status(200).json(talkerIdFind);
  } 
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });  

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
const randomToken = crypto.randomBytes(8).toString('hex');
return res.status(200).json({ token: randomToken });
});

// validateToken, validateName, 
// validateAge, validateTalk, validateWatchedAt, validateRate,

app.post('/talker', validateToken, validateName, 
validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const newTalker = req.body; 
  console.log(newTalker);
  const newTalkers = await newTalkerData(newTalker);
  console.log(newTalkers);
  return res.status(201).json(newTalkers);
});

app.delete('talker/:id', validateToken, async (req, res) => {
  const deleteTalker = req.body;
  await deleteTalkerData(deleteTalker);
  return res.status(204).json();
});