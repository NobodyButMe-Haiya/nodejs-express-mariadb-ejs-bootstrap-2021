function createRecord(mariadb, request, response) {
  mariadb({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
  })
    .then(conn => {
      conn.beginTransaction()
        .then(() => {
          return conn.query("INSERT INTO person (name,age) VALUES (?,?) ", [request.body.name, request.body.age]);
        })
        .then((result) => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);
          conn.commit();
          response.status(200).json({ "status": true, "message": "record inserted" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
function readRecord(mariadb, request, response) {
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
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
function updateRecord(mariadb, request, response) {
  mariadb.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
  })
    .then(conn => {
      conn.beginTransaction()
        .then(() => {
          // unsure it will work 
          // using bind parameter
          return conn.query("UPDATE person SET name=? , age=? WHERE personId = ?  ", [request.body.name, request.body.age, request.body.personId]);

        })
        .then((result) => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);
          conn.commit();
          response.status(200).json({ "status": true, "message": "record updated" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}
function deleteRecord(mariadb, request, response) {
  mariadb.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
  })
    .then(conn => {
      conn.beginTransaction()
        .then(() => {

          return conn.query("DELETE FROM person WHERE personId = ? ", [request.body.personId]);

        })
        .then(() => {
          // some data we want to aquire . 
          console.log("Affected Row : " + result.affectedRows);
          console.log("Insert id : " + result.insertId);
          console.log("warning status : " + result.warningStatus);

          conn.commit();
          response.status(200).json({ "status": true, "message": "record deleted" });
        })
        .catch((err) => {
          console.log(err.message);
          conn.rollback();
        })
    })
    .catch(err => {
      response.status(200).json({ "status": false, "message": err.message });
    });
}

export default { createRecord, readRecord, updateRecord, deleteRecord };