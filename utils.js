const fs = require("fs");
const path = require("path");

//funzione per lettura del json
const readJSON = (fileName) => {
    const filePath = path.join(__dirname, "db", `${fileName}.json`);
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
};

//funzione per scrittura nel json
const writeJSON = (fileName, newData) => {
    const filePath = path.join(__dirname, "db", `${fileName}.json`);
    const fileString = JSON.stringify(newData);
    fs.writeFileSync(filePath, fileString);
};

module.exports = {
    readJSON,
    writeJSON,
};
