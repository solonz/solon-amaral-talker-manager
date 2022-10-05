const fs = require('fs').promises;

async function readTalkerData() {
    try {
        const data = await fs.readFile('./src/talker.json');
        const talkerData = JSON.parse(data);
        return talkerData;
    } catch (error) {
        console.error(`erro na leitura dos dados: ${error}`);
        return [];
    }
}

readTalkerData();

async function writeNewTalkerData(newTalkerData) {
    try {
        const oldTalkerData = await readTalkerData();
        const allTalkerData = JSON.stringify([...oldTalkerData, newTalkerData]);

        await fs.writeFile('./src/talker.json', allTalkerData);
    } catch (error) {
        console.log(`erro na criação de dados: ${error}`);
    }
}

module.exports = {
    readTalkerData,
    writeNewTalkerData,
};