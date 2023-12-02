const express = require('express');
const app = express();
const db = require('mysql2');
const dotenv = require('dotenv');

const pool = mysql.createPool({
  host: 'mariadb.bkoehler.imgd.ca', // Hostname of the database server
  user: 'user',
  password: 'password',
  database: 'user0050_db0001',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: true,
});


