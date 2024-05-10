const express = require('express');
const session = require('express-session')
const routes = require('./controllers');
const sequelize = require('./config/connection.js')


const app = express();
const PORT = process.env.PORT || 3001;

//set up session
const sess = {
    secret: 'Super secret secret',
    cookie:{
        maxAge: 3600000,
        secure: false 
    },
    resave:false,
    saveUninitalized: true,
    store: new session.MemoryStore()
};

//session middleware
app.use(session(sess));

//json and url middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use routes in controllers
app.use('/', routes);

// sync data Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });