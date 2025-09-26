import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "robots.txt");
  const fileContents = fs.readFileSync(filePath, "utf8");

  return new NextResponse(fileContents, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
