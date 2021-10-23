import express from 'express';

import mariadb from 'mariadb';
import { host, database, user, password } from './config';

import createRecord from './Repository/createRecord';
import readRecord from './Repository/readRecord';
import updateRecord from './Repository/updateRecord';
import deleteRecord from './Repository/deleteRecord';

var app = express();
app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', function (request, response) {
  // as usual we need to pre-load the data 

  var result = "";
  mariadb.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
  })
    .then(conn => {
      result = conn.query("SELECT * FROM person ");
      console.log(result);
      _.difference(result['meta']);
      return result;
    }).then((result) => {
      console.log("complete")
      response.status(200).json({ "status": true, "a": "3", "data": result });

      response.render('pages/index', {
        data: result
      });
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });

});

app.post('/', function (request, response) {
  switch (request.body.mode) {
    case "create":
      createRecord(request, response);
      break;
    case "read":
      readRecord(request, response);
      break;
    case "update":
      updateRecord(request, response);
      break;
    case "delete":
      deleteRecord(request, response);
      break;
    default:
      response.status(200).json({ "status": false, "message": "something wrong with routing " });
      break;
  }
});
