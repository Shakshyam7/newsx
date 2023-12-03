import mariaDB from 'mysql2';
import { config } from 'dotenv';

config();

const pool = mariaDB.createPool({
  host: 'mariadb.bkoehler.imgd.ca', // Hostname of the database server
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'user0050_db0001',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
