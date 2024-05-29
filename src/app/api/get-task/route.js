import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await conn.query("SELECT * FROM todos");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}
