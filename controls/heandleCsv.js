const fs = require('fs');

const sequelize = require('../config/db');
const Letter = require('../models/Letter');

const { initialCsv, doneRoute } = require('../config/config');

module.exports = function checkFolder(inputFolder) {
    console.log(inputFolder + initialCsv);
    fs.readdir(inputFolder + initialCsv, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.length > 0 && files.forEach(file => {
                if (file.endsWith('.csv')) {
                    console.log('new file', file);
                    readCsvFile(file, inputFolder, initialCsv);
                } else {
                    console.log('not a csv file', file);
                }
            })
        }
    });
}

function readCsvFile(file, inputFolder, initialCsv) {
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
    myPromise.then(() => moveFileToDoneFolder(file, inputFolder, initialCsv));
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



function moveFileToDoneFolder(file, inputFolder, initialCsv) {
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
