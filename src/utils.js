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
        const xablau = { id: (oldTalkerData.length + 1), ...newTalker };
        console.log(xablau);
        return xablau;
    } catch (error) {
        console.log(`erro na criação de dados: ${error}`);
        return [];
    }
}

// async function deleteTalkerData(newTalker) {
//     try {
//         const currentTalkerData = await readTalkerData();
//         const undeletedTalkerData = currentTalkerData.filter((talker) => talker.id !== newTalker.id);
//         console.log(undeletedTalkerData);

//         await fs.writeFile('./src/talker.json', allTalkerData);
//         return newTalkers;
//     } catch (error) {
//         console.log(`erro na criação de dados: ${error}`);
//     }
// }

module.exports = {
    readTalkerData,
    newTalkerData,
    // deleteTalkerData,
};