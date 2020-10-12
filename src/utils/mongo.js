const Writable = require('stream').Writable;
const MongoClient = require('mongodb');

let mongoDb;
async function connectMongo() {
    try {
        console.log("Try to connect to mongo ...")
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000})
        if (!client)
            throw new Error('no_mongo');

        const db = await client.db('kata-1')

        //clear kate-1 database
        await db.dropDatabase();
        console.log("Successfully connected at mongo")
        mongoDb = db;
        return db;
    } catch (e) {
        console.log("No mongo, use in memory data")
        return null;
    }
}

function getDb() {
    return mongoDb;
}


class MongoStream extends Writable {
    constructor(options, db, collection) {
        super(options);
        this.lines = [];
        this.db = db;
        this.collection = collection;
    }


    _write(chunk, encoding, next) {
        this.lines.push(chunk);
        if (this.lines.length >= 5000) {
            this.db.collection(this.collection).insertMany(this.lines);
            this.lines.length = 0;
        }
        next();
    }

    async _final(next) {
        await this.db.collection(this.collection).insertMany(this.lines);
        console.log('Collection ' + this.collection + ' successfully created from ' + this.collection + '.csv .')
        next();
    }
}

module.exports = {
    connectMongo,
    MongoStream,
    getDb
}