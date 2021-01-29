const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser  = require('body-parser');
const path = require('path');
const db  = require('./config/db');
const gigsRoute = require('./routes/gigs');

const app = express();

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main', 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Test DB
db.authenticate()
    .then(() => {
        console.log('Database conected')
    })
    .catch((error) => {
        console.error(error);
    })


//Index view
app.get('/', (request, response) => {
    response.render('index', { layout: 'landing' });
});

//Gig routes
app.use('/gigs', gigsRoute )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});
