const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser  = require('body-parser');
const path = require('path');
const db  = require('./config/db');
const gigsRoute = require('./routes/gigs')

//Test DB
db.authenticate()
    .then(() => {
        console.log('Database conected')
    })
    .catch((error) => {
        console.error(error);
    })

const app = express();

app.get('/', (request, response) => {
    response.send('INDEX');
});

//Gig routes
app.use('/gigs', gigsRoute )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});
