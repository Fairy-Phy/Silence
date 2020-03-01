// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

const mysql = require('mysql');

module.exports =
    mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: '',
        multipleStatements: true
    });