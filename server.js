import express  from 'express';
import mariadb from 'mariadb';



import  person from './Repository/person.js'

var app = express();
app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', function (request, response) {
  // as usual we need to pre-load the data 

  var result = "";
  mariadb.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
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
      person.createRecord(mariadb,request, response);
      break;
    case "read":
      person.readRecord(mariadb,request, response);
      break;
    case "update":
      person.updateRecord(mariadb,request, response);
      break;
    case "delete":
      person.deleteRecord(mariadb,request, response);
      break;
    default:
      response.status(200).json({ "status": false, "message": "something wrong with routing " });
      break;
  }
});
