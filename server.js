const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); //how you use the handlebars (hbs) module

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server log', log + '\n', (error) => {
        if(error) {
            console.log('unable to append to server.log')
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// }) this stops the website working and showing maintenance message

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (word) => {
    return word.toUpperCase();
})  

app.get('/', (req, res) => {
    res.render('home.hbs', { 
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about' , (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errormesage: 'poop'
    });
});

app.listen(port, () => {
    console.log(`server is up on ${port}`)
});

