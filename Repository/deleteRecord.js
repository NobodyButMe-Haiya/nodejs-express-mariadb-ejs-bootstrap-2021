import mariadb from 'mariadb';
import { host,database,user,password } from '../config';

function deleteRecord(request, response) {
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
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