import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { task, description } = await req.json();
    const result = await conn.query("INSERT INTO todos SET ?", {
      task,
      description,
    });
    return NextResponse.json({ task, description, id: result.insertId });
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}
