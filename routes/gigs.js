const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Gig = require('../models/Gig');

router.get('/', (request, response) => {
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            response.sendStatus(200);
        })
        .catch((error) => {
            console.error(error);
        })
    //response.send('GIGS');
});

module.exports = router;