const mysql2 = require('mysql2');

// connection pool
const pool = mysql2.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// View users
exports.view = (req, res) => {


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        // User the connection
        connection.query('SELECT * FROM user WHERE status = "active" ', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)

        });
    });

}

//find 
exports.find = (req, res) => {
    if (err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    let searchTerm = req.body.search;

    // User the connection
    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + ' % '], ['%' + searchTerm + ' % '], (err, rows) => {
        // When done with the connection, release it
        connection.release();
        if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows)

    });
};

exports.form = (req, res) => {
    res.render('add-user');
}

//add new user
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, commets } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search

        // User the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? ', [first_name, last_name, email, phone, commets], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });

}
