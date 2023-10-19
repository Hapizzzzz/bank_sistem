const express = require ('express');
const path = require ('path');
const cookieParser = require ('cookie-parser');
const logger = require ('morgan');
const port = 3000;

const app = express ();

const indexRouter = require ('./routes/');

const v1 = '/api/v1';

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'public')));

app.get(v1, (req, res) => {
    res.status(200).json({
        message: 'Welcome to api bank sistem',
    });
});

app.use(v1, indexRouter);

app.listen (port, () => {
  console.log (`Bank System app listening on port ${port}`);
});

module.exports = app;
