var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pkgcloud = require('pkgcloud');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

 var openstack = pkgcloud.compute.createClient({
    provider: 'openstack',
    keystoneAuthVersion: 'v3',
    authUrl: 'http://192.168.1.51:5000', // required
    username: 'admin',
    password: 'a10ac0db07954235',// required
	region: 'RegionOne',
	domainId: 'default',
	tenantId: '46097cca49184327bd5abcbed22a0063' // required
  });
  console.log(openstack);


 openstack.getImages(function(err,images){
 	if(err){
 		console.log(err);
 	}
 	else{
 		console.log("The images are:");
 		console.log(images);
 	}
 });

 openstack.getServers(function(err,servers){
 	if(err){
 		console.log(err);
 	}
 	else{
 		console.log("The servers are:");
 		console.log(servers);
 	}
 });

 openstack.getServer('8ac1a4ec-0059-4a53-882a-951dbb6c3807',function(err,server){
 	if(err){
 		console.log(err);
 	}
 	else{
 		console.log("The server is:");
 		console.log(server);
 	}
 });



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SHOW databases;", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

module.exports = app;
