import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';



let connection: Connection;
export const createConnection = async () => {
    if (connection) { return connection; }
    connection = await mysql.createConnection({
        host: process.env.DB_HOST, // 'localhost',
        user: process.env.DB_USERNAME, // 'root',
        password: process.env.DB_PASSWORD, // '6527',
        database: process.env.DB_DATABASE, // 'todo'
    });

    return connection;
}