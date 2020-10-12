const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const mongo = require('./utils/mongo');
const inMemory = require('./utils/in-memory');
const getMongoDao = require('./dao/mongo.dao');
const getInMemoryDao = require('./dao/in-memory.dao');

let dao;
async function initData(dataDirectory) {
    const mongoDb = await mongo.connectMongo();

    await parseCsv(!!mongoDb, mongoDb, dataDirectory);

    dao = mongoDb ? getMongoDao() : getInMemoryDao();
}

function getDao() {
    return dao
}

// list csv files in data dir, read and put data in mongo or in memory if no mongo
async function parseCsv(hasMongo, mongoDb, dataDirectory) {
    console.log("Import data from CSVs in " + dataDirectory);
    const csvFiles = fs.readdirSync(dataDirectory || './data');
    let promiseArray;

    promiseArray = csvFiles.map((csvFile) => {
        return promiseFromStream(
            path.join('./data', csvFile),
            parse({delimiter: ';', columns: true, bom: true}),
            path.basename(csvFile, '.csv'),
            hasMongo ? mongoDb : null
        )
    });
    await Promise.all(promiseArray);
}

// Make a promise for await stream close, put data in memory if db is null
function promiseFromStream(filePath, parser, key, db) {
    return new Promise((res, rej) => {
        let streamWriter;
        if (db)
            streamWriter = new mongo.MongoStream({objectMode: true}, db, key);
        else
            streamWriter = new inMemory.InMemoryStream({objectMode: true}, key)

        streamWriter.on('finish', () => res());
        streamWriter.on('error', (e) => rej(e));

        fs.createReadStream(filePath).pipe(parser).pipe(streamWriter);
    })
}

module.exports = {initData, getDao};