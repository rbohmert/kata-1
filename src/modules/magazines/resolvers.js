const getDao = require('../../data').getDao
const csvExport = require('../../utils/export')

module.exports = {
    Query : {
        magazines: (_, {}, context) => getDao().getMagazines(),
        magazine: (_, { isbn }, context) => getDao().getMagazine(isbn),
        magazinesExport: (_, {}, context) => csvExport(getDao().getMagazines(), 'magazines')
    }
};