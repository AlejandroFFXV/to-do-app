import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const data = await req.json();
  const result = await conn.query("UPDATE todos SET done = ? WHERE id = ?", [
    data.done,
    params.id,
  ]);
  console.log(result);
  return new NextResponse({
    ...data,
  });
}
