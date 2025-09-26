import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET({ params }: { params: { file: string } }) {
  const { file } = params;
  const filePath = path.join(process.cwd(), "public", file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const content = fs.readFileSync(filePath, "utf8");
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
