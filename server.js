import express from 'express';
import mariadb from 'mariadb';
import lodash from 'lodash';
import person from './Repository/person.js'

var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.listen(3000);

var host = "localhost";
var user = "youtuber";
var database = "youtuber";
var password = "123456";

var connection = mariadb.createConnection({
  host: host,
  database: database,
  user: user,
  password: password
});

app.get('/', function (request, response) {
  // as usual we need to pre-load the data 
  // check config 
  // response.render('pages/test');

  var result = "";
  connection
    .then(conn => {
      result = conn.query("SELECT * FROM person ");
      console.log(result);
      lodash.difference(result['meta']);
      return result;
    }).then((result) => {
      console.log("complete")

      response.render('pages/index', {
        data: result
      });
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
      response.render('pages/error', {
        message: err.message
      })
    });

});
app.get('/api', function (request, response) {
  response.render('pages/denied')
});
app.post('/api', function (request, response) {
  switch (request.body.mode) {
    case "create":
      person.createRecord(connection, request, response);
      break;
    case "read":
      person.readRecord(connection, request, response);
      break;
    case "update":
      person.updateRecord(connection, request, response);
      break;
    case "delete":
      person.deleteRecord(connection, request, response);
      break;
    default:
      response.status(200).json({ "status": false, "message": "something wrong with routing " });
      break;
  }
});
