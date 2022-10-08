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

async function newTalkerData(newTalker) {
    try {
        const oldTalkerData = await readTalkerData();
        const newTalkers = { id: oldTalkerData.length + 1, ...newTalker };
        const allTalkerData = JSON.stringify([...oldTalkerData, newTalkers]);
        console.log(allTalkerData);

        await fs.writeFile('./src/talker.json', allTalkerData);
        return newTalkers;
    } catch (error) {
        console.log(`erro na criação de dados: ${error}`);
    }
}

module.exports = {
    readTalkerData,
    newTalkerData,
};