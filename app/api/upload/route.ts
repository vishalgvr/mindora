import { NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/json",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 25MB maximum limit." },
        { status: 400 }
      );
    }

    const fileType = file.type || "application/octet-stream";
    const fileName = file.name;
    const fileSize = file.size;

    // Convert file to base64 data URL for preview and inline processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const storageUrl = `data:${fileType};base64,${base64}`;

    return NextResponse.json({
      success: true,
      attachment: {
        fileName,
        fileType,
        fileSize,
        storageUrl,
      },
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
