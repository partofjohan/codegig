const { Sequelize } = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Gig = require('../models/Gig');
const Op = Sequelize.Op;

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
    
    let { title, technologies, budget, description, contact_email} = request.body;

    let errors = [];

    if (!title) {
        errors.push({ text: 'Please add a title' });
    }

    if (!technologies) {
        errors.push({ text: 'Please add the technologies' });
    }

    if (!description) {
        errors.push({ text: 'Please add a description' });
    }

    if (!contact_email) {
        errors.push({ text: 'Please add the contact email' });
    }

    //Check for errors
    if (errors.length > 0) {
        response.render('add', {
            errors,
            title,
            technologies,
            description,
            budget,
            contact_email
        });
    } else {
        //Insert into table
        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }

        technologies = technologies.toLowerCase().replace(/, /g, ',');

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
    }
});

//Search for gigs
router.get('/search', (request, response) => {
    let { term } = request.query;
    term = term.toLowerCase();

    Gig.findAll({ where: { technologies: { [Op.like]:  '%' + term + '%'  } } })
        .then((gigs) => {
            response.render('gigs', { gigs });
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;