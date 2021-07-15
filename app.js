var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
const config= require('./config')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors')
const port = process.env.PORT || 8000


var indexRouter = require('./routes/index');


var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, 'website')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'website', 'index.html'));
});



mongoose.connect(config.dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(console.log("Db connected"))
.catch(error => console.error(error));


app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})




module.exports = app;