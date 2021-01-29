const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Gig = require('../models/Gig');

//Get gig list
router.get('/', (request, response) => {
    Gig.findAll()
        .then(gigs => {
            response.render('gigs', {
                gigs
            });
        })
        .catch((error) => {
            console.error(error);
        })
});

//Display add gif form
router.get('/add', (request, response) => {
    response.render('add');
});

//Add a gig
router.post('/add', (request, response) => {
    const data = {
        title: 'Simple Wordpress site',
        technologies: 'worldpress, php, html, css',
        budget: '$1000',
        description: 'We’re looking for an experienced JavaScript developer with excellent knowledge of client-side engineering using modern frameworks, preferably React. This is a mid-senior level role, and as such we’re looking for someone to provide technical guidance and mentorship to junior developers, and have active input into the design and technical decision making process.',
        contact_email: 'maria@mail.com'
    }
    let { title, technologies, budget, description, contact_email} = data;

    //Insert into table
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then((gig) => {
            response.redirect('/gigs');
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router;