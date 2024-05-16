const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const helpers = require('./utils/auth.js');



const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//set up session
const sess = {
    secret: 'Super secret secret',
    cookie:{
        maxAge: 3600000,
        secure: false 
    },
    resave:false,
    saveUninitialized: true,
    store: new session.MemoryStore()
};

//session middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//json and url middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// use routes in controllers
app.use('/', routes);

// sync data Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });