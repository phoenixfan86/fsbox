import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Params {
  file: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
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
