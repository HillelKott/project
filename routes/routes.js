const express = require('express');
const router = express.Router();

const query = require('../controls/query');

// @route   GET /
// @desc    Get insureId localhost is running
router.get('/', (req, res) => {
    res.send('hello world !');
});

// @route   GET /insureId/ <insureId>
// @desc    Get insureId faild letters id's
router.get('/:insureId', async (req, res) => {
    // Basically better to use post here, But I do not want to open postman...

    const { insureId } = req.params;

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    if (!hasNumber(insureId)) {
        res.status(400).send('You must provide a valid insureId');
    } else {
        query(insureId)
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => res.status(400).send('nkkjkjk!'));
    };

});

module.exports = router;
// http://localhost:5000/insureId/111111111