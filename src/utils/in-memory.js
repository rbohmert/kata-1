const Writable = require('stream').Writable;

const data = {};

class InMemoryStream extends Writable {
    constructor(options, key) {
        super(options);
        this.lines = [];
        this.key = key;
        data[key] = [];
    }

    _write(chunk, encoding, next) {
        this.lines.push(chunk);
        if (this.lines.length >= 5000) {
            data[this.key].push(...this.lines);
            this.lines.length = 0;
        }
        next();
    }

    async _final(next) {
        data[this.key].push(...this.lines);
        console.log('Csv ' + this.key + '.csv parsed in array in memory')
        next();
    }
}

module.exports = {data, InMemoryStream}