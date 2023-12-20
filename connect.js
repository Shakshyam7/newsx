import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const db = mysql.createConnection({
  host: process.env.HOST, // Hostname of the database server
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'NewsX',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;
