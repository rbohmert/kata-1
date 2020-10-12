const getDb = require('../utils/mongo').getDb

const getMongoDao = () => {
    return {
        getBooks: () => getDb().collection('books').find().toArray(),
        getBook: (isbn) => getDb().collection('books').findOne({isbn}),
        //aggregate because authors stored as string not array
        getBooksByAuthor: (author) => {
            return getDb().collection('books').aggregate([
                { $project : { isbn: 1, title: 1, description: 1, authors: 1, authors_split: { $split: ["$authors", ","] } } },
                { $match: { authors_split: author }},
                { $project: { authors_split: 0, _id: 0 }}
            ]).toArray();
        },
        getMagazines: () =>  getDb().collection('magazines').find().toArray(),
        getMagazine: (isbn) =>  getDb().collection('magazines').findOne({isbn}),
        getAuthors: () =>  getDb().collection('authors').find().toArray(),
        getAuthor: (email) =>  getDb().collection('authors').findOne({email}),
        insertBook: async (isbn, title, author, description) => {
            await getDb().collection('books').insertOne({isbn, title, author, description});
            return {isbn, title, author, description}
        }
    }
}

module.exports = getMongoDao