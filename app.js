const express = require('express');
const app = express();
const fs = require('fs');

const { sequelize, Model, DataTypes } = require('./db');
const Letter = require('./models/letter');

const port = process.env.PORT || 5000;
const inputFolder = __dirname;
const initialCsv = '/csv_files/';

app.get('/', (req, res) => {
    res.send('hello world !');
});

// setInterval(() => {
checkFolder(inputFolder + initialCsv)
// }, 2000)

const filesInFolder = []

function checkFolder() {
    fs.readdir(inputFolder + initialCsv, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.length > 0 && files.forEach(file => {
                if (file.endsWith('.csv')) {
                    filesInFolder.push(file)
                    console.log('new file', file);
                    readCsvFile(file);
                    moveFileToDoneFolder(file);
                } else {
                    console.log('not a csv file', file);
                }
            })
        }
    });
}

function readCsvFile(file) {
    const textByLine = fs.readFileSync(inputFolder + initialCsv + file).toString().split("\n");
    const res = textByLine.map((line) => line.split(","));
    console.log(res)
};


function createLetter(letter) {
    Letter.create({
        letterID: letter.letterID,
        letterType: letter.letterType,
        insureId: letter.insureId,
        destributionType: letter.destributionType,
        status: letter.status,
    }).then((res) => {
        console.log('done', res);
    }).catch(err => {
        console.log(err);
    });
};

createLetter({
    letterID: 90050,
    letterType: '1001',
    insureId: 111111111,
    destributionType: 'SMS',
    status: 'Success'
})


function moveFileToDoneFolder(file) {
    var newPath = inputFolder + '/done';

    if (!fs.existsSync(newPath)) {
        console.log(newPath);
        fs.mkdirSync(newPath);
    };

    fs.copyFile(`${inputFolder}/csv_files/${file}`, `${inputFolder}/done/${file}`, (err) => {
        if (err) throw err;
        console.log(`${file}was copied to destination`);
        fs.unlink(`csv_files/${file}`, function (err) {
            if (err) console.error("Error occurred while trying to remove file");
            else {
                console.info(`removed`);
            }
        });
    });
};

app.listen(port, console.log(`app is running on port ${port}`));