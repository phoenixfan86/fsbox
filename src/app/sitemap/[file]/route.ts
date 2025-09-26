import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.pathname.split("/").pop();

  if (!file) return new NextResponse("Not Found", { status: 404 });

  const filePath = path.join(process.cwd(), "sitemap", file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const content = fs.readFileSync(filePath, "utf8");
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
