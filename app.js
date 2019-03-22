var createError = require('http-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var pro40Router = require('./routes/pro40');
var usersRouter = require('./routes/urban');
var rainRouter = require('./routes/rain');
var hotspotRouter = require('./routes/hotspot');
var hinfoRouter = require('./routes/hinfo');

var app = express();

// CORS
app.use(cors());
app.options('*', cors());

// upload
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pro40', pro40Router);
app.use('/urban', usersRouter);
app.use('/rain', rainRouter);
app.use('/hp', hotspotRouter);
app.use('/hinfo', hinfoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;