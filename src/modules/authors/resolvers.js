const getDao = require('../../data').getDao
const csvExport = require('../../utils/export')

module.exports = {
    Query : {
        authors: (_, {}, context) => getDao().getAuthors(),
        author: (_, { email }, context) => getDao().getAuthor(email),
        authorsExport: (_, {}, context) => csvExport(getDao().getAuthors(), 'authors')
    }
};