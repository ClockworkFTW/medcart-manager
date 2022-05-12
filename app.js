const express = require('express'); 
const app = express();
require('dotenv').config()

// Port
const PORT = 30296;

// Middlewares
const morgan = require('morgan');
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

// Template engine
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');   
app.engine('.hbs', engine({extname: ".hbs", helpers: require('./config/hbs-helpers')}));  
app.set('view engine', '.hbs');

// Home route
app.get('/', (req, res) => {  
    res.render('index');                                                             
}); 

// Other routes
app.use('/patients', require('./routes/patients'))
app.use('/drugs', require('./routes/drugs'))
app.use('/nurses', require('./routes/nurses'))
app.use('/nhp', require('./routes/nhp'))
app.use('/dispenses', require('./routes/dispenses'))
app.use('/prescriptions', require('./routes/prescriptions'))

// Start server
app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});