var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
var logger = require('morgan');

// ✅passport.use()
// ใช้ LocalStrategy โดยใช้ username และ password
// ภายใน function จะใช้ User.findOne() เพื่อหา username ใน Database
// ถ้าเจอ ก็ compareSync ด้วย bcrypt หากตรง แสดงว่า login ถูกต้อง
// ก็จะ cb (คือ callback function) ส่งต่อไปให้ `req.user` จะมีค่า user
// และไป step ถัดไปคือ serialzie และ deserialize

passport.use(
  new LocalStrategy((username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }

      if (bcrypt.compareSync(password, user.password)) {
        return cb(null, user);
      }
      return cb(null, false);
    });
  })
);

// ✅serializeUser และ seserialize จะใช้ร่วมกับ session เพื่อจะดึงค่า user ระหว่าง http request
// โดย serializeUser จะเก็บ ค่าไว้ที่ session
// ในที่นี้คือ cb(null, user._id_) - ค่า _id จะถูกเก็บใน session
// ส่วน derialize ใช้กรณีที่จะดึงค่าจาก session มาหาใน DB ว่าใช่ user จริงๆมั้ย
// โดยจะเห็นได้ว่า ต้องเอา username มา `User.findById()` ถ้าเจอ ก็ cb(null, user)
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

var app = express();

require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
