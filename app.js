var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require("fs");
var userName = "admin";
var userPassword = "test";

var bodyparser = require('body-parser');
var urlencodedParser =bodyparser.urlencoded ({ extended: true });
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/frontend', function (req, res) {
    var html= "";
    html += '<body>';
    html +="<form action='/backend' method ='post' name ='form1'>";
    html +="Email: <input type ='text' name = 'email'> <br/>";
 
    html +="<br/><br/><br/>";
    html +="Logga in för att se alla sparade mail";
    html +="<br/><br/>";
    html +="Username: <input type ='text' name = 'userName'> <br/>";
    html +="Password: <input type ='text' name = 'userPassword'> <br/>";
    html +="<input type='submit' value ='Logga in'><br/>";
    html +="</form>";
    html +="</body>";
    res.send(html);
});


app.post('/backend', urlencodedParser, function(req, res,){
    fs.readFile("users.json", (err,data) => {
        if (err) throw err;
        var users = JSON.parse(data);
        newUser = req.body.email;
        users.push(newUser);
        var saveUsers = JSON.stringify(users);
        fs.writeFile("users.json",saveUsers, (err,data) => {
            if (err) throw err;
        })
       res.send(users)
       })
});
module.exports = app;
