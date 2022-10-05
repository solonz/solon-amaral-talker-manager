const express = require('express');
const bodyParser = require('body-parser');
const { 
  // readTalkerData, 
  // writeNewTalkerData, 
  readTalkerData,
 } = require('./utils');

const app = express();
app.use(bodyParser.json());

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
  res.sendStatus(404);
} 
});