const express = require('express');
const app = express();
const fs = require('fs')
const parse = require('csv-parse')
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('hello world !');
});

fs.readFile(__dirname + '/csv_files/letters.feedback.csv', function (err, data) {
    if (err) console.log(err);
    parse(data, { columns: false, trim: true }, function (err, rows) {
        if (err) console.log(err);
        console.log(data);
        // Your CSV data is in an array of arrys passed to this callback as rows.
    })
    // console.log(data);
})




app.listen(port, console.log(`app is running on port ${port}`));