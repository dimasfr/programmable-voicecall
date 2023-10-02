require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TW_SID, process.env.TW_TOKEN);

// Put your number below
const from = '';

// @route   POST api/call
router.post('/', async(req, res) => {
    try {
        const target_number = req.body.to;
        client.calls.create({
            twiml: '<Response><Say>'+ req.body.msg +'</Say></Response>',
            to: '+' + target_number.replace(/[^0-9]/g, ''),
            from: from
        })
        .then(call => {
            res.json({ status: call.sid ? 200 : 400, msg: call.status });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;