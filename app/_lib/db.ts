import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';



let connection: Connection;
export const createConnection = async () => {
    if (connection) { return connection; }
    connection = await mysql.createConnection({
        host: process.env.DB_HOST, 
        user: process.env.DB_USERNAME, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_DATABASE,
    });

    return connection;
}