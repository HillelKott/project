const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;

const sequelize = require('./db');
const Letter = require('./models/Letter');

const inputFolder = __dirname;
const { initialCsv, doneRoute } = require('./config/config');

app.use('/insureId/', require('./routes'))
app.use('/', require('./routes'))

setInterval(() => {
    checkFolder(inputFolder + initialCsv)
}, 5 * 60 * 100)


function checkFolder() {
    fs.readdir(inputFolder + initialCsv, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.length > 0 && files.forEach(file => {
                if (file.endsWith('.csv')) {
                    console.log('new file', file);
                    readCsvFile(file);
                } else {
                    console.log('not a csv file', file);
                }
            })
        }
    });
}

function readCsvFile(file) {
    const myPromise = new Promise((resolve, reject) => {
        const textByLine = fs.readFileSync(inputFolder + initialCsv + file).toString().split("\n");
        textByLine.shift();
        textByLine.map((line) => {
            const data = line.split(",");
            createLetter({
                letterID: data[0],
                letterType: data[1],
                insureId: data[2],
                destributionType: data[3],
                status: data[4]
            });
        });
        resolve();
    })
    myPromise.then(() => moveFileToDoneFolder(file));
};


function createLetter(letter) {
    sequelize.sync()
        .then(() => {
            return Letter.create({
                letterID: letter.letterID,
                letterType: letter.letterType,
                insureId: letter.insureId,
                destributionType: letter.destributionType,
                status: letter.status,
            });
        })
        .then((res) => console.log('done', res))
        .catch(err => console.log(err));
};



function moveFileToDoneFolder(file) {
    // fs.rename() method will move a file from one location to another.
    // this is actualy the best way to move a file from one location to another but it makes some buge that require to stop the windows defender, so i use this method...

    var newPath = inputFolder + doneRoute;

    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

    fs.copyFile(`${inputFolder}${initialCsv}${file}`, `${inputFolder}${doneRoute}/${file}`, (err) => {
        if (err) throw err;
        console.log(`${file} was copied to destination`);
        fs.unlink(`csv_files/${file}`, function (err) {
            if (err) console.error("Error occurred while trying to remove file");
            else {
                console.info(`removed`);
            }
        });
    });
};

app.listen(port, console.log(`app is running on port ${port}`));