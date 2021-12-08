const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const inputFolder = __dirname;

const checkFolder = require('./controls/heandleCsv');

app.use('/insureId/', require('./routes/routes'))
app.use('/', require('./routes/routes'))

// setInterval(() => {
checkFolder(inputFolder)
// }, 5 * 60 * 100)


app.listen(port, console.log(`app is running on port ${port}`));