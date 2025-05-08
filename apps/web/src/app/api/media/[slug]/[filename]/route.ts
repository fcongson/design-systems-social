import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";
import { slugToDir } from "../../../../../lib/mdx-utils";

export const dynamic = "force-dynamic"; // Make sure the route is dynamically regenerated

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> },
) {
  const { slug, filename } = await params;

  // Convert slug back to directory name
  const dirName = slugToDir(slug);

  if (!dirName) {
    return new Response("Not found", { status: 404 });
  }

  // Construct the path to the file
  const filePath = path.join(
    process.cwd(),
    "../../packages/mdx-content/media",
    dirName,

    filename,
  );

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  // Read the file
  const fileBuffer = fs.readFileSync(filePath);

  // Determine content type based on file extension
  const contentType = getContentType(filename);

  // Return the file with appropriate content type
  return new Response(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
