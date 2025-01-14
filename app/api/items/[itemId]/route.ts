import { NextResponse } from 'next/server';
import { createConnection } from "../../../_lib/db";
import { RowDataPacket } from 'mysql2/promise';



interface todoItem extends RowDataPacket {
    id: number;
    name: string;
    memo: string;
    isComplete: number;
}




export async function GET (request: Request) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[3];


    const db = await createConnection();
    if (db == undefined) {
        console.error('Database connection failed.');
        return NextResponse.json({ error: 'Database connection failed' });
    }

    const sql = "SELECT * FROM todoList WHERE id = (?)";
    const [rows] = await db.query(sql, [id]);

    if (rows != null) {
        return NextResponse.json({ status: 'success', data: rows });
    }
}



export async function DELETE (request: Request) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    let id: number = Number(pathParts[3]);


    const db = await createConnection();
    if (db == undefined) {
        console.error('Database connection failed.');
        return NextResponse.json({ error: 'Database connection failed' });
    }

    const deleteSql = "DELETE FROM todoList WHERE id = (?)";
    const [deleteData] = await db.query(deleteSql, [id]);

    const maxIdSql = "SELECT MAX(id) FROM todoList";
    const [findId]: [todoItem[], unknown] = await db.query<todoItem[]>(maxIdSql);
    const maxId: number = findId[0]['MAX(id)'];
    

    while (id < maxId) {
        const updateSql = "UPDATE todoList SET id = (?) WHERE id = (?)";
        await db.query(updateSql, [id, id + 1]);
        id = id + 1;
    }


    if (deleteData != null) {
        return NextResponse.json({ status: 'success', message: "Item successfully deleted" });
    }
}




export async function PATCH (request: Request) {
    
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id: number = Number(pathParts[3]);


    const db = await createConnection();
    if (db == undefined) {
        console.error('Database connection failed.');
        return NextResponse.json({ error: 'Database connection failed' });
    }

    const data = await request.json();
    
    if (data.name && data.memo) {
        const updateSql = "UPDATE todoList SET name = (?), memo = (?) WHERE id = (?)";
        const [rows] = await db.query(updateSql, [data.name, data.memo, id]);
        
        if (rows != null) {
            return NextResponse.json({ status: 'success', message: "Item's name and memo successfully updated" });
        }
    } else {
        const updateSql = "UPDATE todoList SET isComplete = (?) WHERE id = (?)";
        const [rows] = await db.query(updateSql, [data.isComplete, id]);
        
        if (rows != null) {
            return NextResponse.json({ status: 'success', message: "Item's isComplete successfully updated" });
        }
    }

}