const express = require('express');
const sequelize = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}));
app.use(express.static(path.join(__dirname, 'public')));
const hbs = exphbs.create({
  helpers: {
    get_emoji: () => {
      const emojis = ['😀', '😎', '🤖', '🐳'];
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return emojis[randomIndex];
    },
  },
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
