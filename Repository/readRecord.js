import mariadb from 'mariadb';
import { host, database, user, password } from '../config';
export default function readRecord(request, response) {
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
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
