const express = require('express');
const router = express.Router();

const query = require('./query');

// @route   GET api/products
// @desc    Get all products
// @access  Public

router.get('/:insureId', async (req, res) => {
    const insureId = req.params.insureId;

    const result = await query(insureId);
    console.log('res 3 ', result);
    res.status(200).json(result)

    // '444444444'
});

module.exports = router;