const fs = require('fs');
var os = require("os");

function csvExport(array, name) {
    console.log("Export " + name + " in csv")
    const fileStream = fs.createWriteStream(name + '.csv');
    let header = "";
    for (let key in array[0])
        header += key + ';';
    header = header.replace(/.$/,os.EOL);
    fileStream.write(header)
    for (let obj of array){
        let line = "";
        for (let key in obj)
            line += obj[key] + ';';
        line = line.replace(/.$/,os.EOL);
        fileStream.write(line)
    }
    fileStream.close();
    console.log("Exported")
    return "Done";
}

module.exports = csvExport