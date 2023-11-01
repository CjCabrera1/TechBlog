const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index')
const userRoutes = require('./controllers/api/userRoutes');
const postRoutes = require('./controllers/api/homeRoutes');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: `Super Secret!`,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define your Express routes
app.use('/users', userRoutes);
app.use('/api', postRoutes);
app.use('/app',routes)
// Define the homepage route
app.get('/', (req, res) => {
  // Check if the user is logged in and set the loggedIn variable accordingly
  const loggedIn = req.session.loggedIn || false;

  // Render the homepage view with the loggedIn variable
  res.render('homepage', { loggedIn });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
