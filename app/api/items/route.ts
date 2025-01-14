import { NextResponse } from 'next/server';
import { createConnection } from "../../_lib/db";
import { RowDataPacket } from 'mysql2/promise';



interface todoItem extends RowDataPacket {
    id: number;
    name: string;
    memo: string;
    isComplete: number;
}


export async function POST(request: Request) {
    let id: number = 0;
    const data = await request.json();


    const db = await createConnection();
    if (db == undefined) {
        console.error('Database connection failed.');
        return NextResponse.json({ error: 'Database connection failed' });
    }

    const sqlId = "SELECT MAX(id) FROM todoList";
    const [findId]: [todoItem[], unknown] = await db.query<todoItem[]>(sqlId);

    id = Number(findId[0]['MAX(id)']);
    id = id + 1;



    const sqlInsert = "INSERT INTO todoList (id, name) VALUES (?, ?)";
    const [rows] = await db.query(sqlInsert, [id, data.name]);
    if (rows != null) {
        return NextResponse.json({ status: 'success', data:{id: id, name: data.name, memo: null, isComplete: 0} });
    } else {
        return NextResponse.json({ status: 'fail'});
    }
}



export async function GET() {
    const db = await createConnection();
    if (db == undefined) {
        console.error('Database connection failed.');
        return NextResponse.json({ error: 'Database connection failed' });
    }

    const sql = "SELECT * FROM todoList";
    const [rows] = await db.query(sql);
    console.log('rows: ', rows);
    
    if (rows != null) {
        return NextResponse.json({ status: 'success', data: rows });
    } else {
        return NextResponse.json({ status: 'fail' });
    }
}