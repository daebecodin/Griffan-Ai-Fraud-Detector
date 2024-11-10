const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 47334,       // Docker-exposed port
    user: 'root'       // Default user, with no password needed
});

connection.connect();

connection.query('SELECT * FROM files.transaction_data LIMIT 30;', (error, results) => {
    if (error) throw error;
    console.log(results);
});

connection.end();
