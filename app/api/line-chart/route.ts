// app/api/data/route.ts
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'my_data_project',
    password: '12345',
    port: 5432,
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    const result = await client.query('SELECT * FROM data_points');

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end();
  }
}
