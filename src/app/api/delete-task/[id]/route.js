import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const result = await conn.query("DELETE FROM todos WHERE id = ?", [
    params.id,
  ]);
  return new NextResponse(null, {
    status: 204,
  });
}
