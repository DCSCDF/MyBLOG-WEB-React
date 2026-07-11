import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, level = "info" } = await request.json();
    
    const timestamp = new Date().toISOString();
    const logColors = {
      info: "\x1b[34m",
      warn: "\x1b[33m",
      error: "\x1b[31m",
      success: "\x1b[32m",
    };
    const resetColor = "\x1b[0m";
    
    console.log(`[AUTH] ${timestamp} ${logColors[level as keyof typeof logColors] || logColors.info}${level.toUpperCase()}${resetColor}: ${message}`);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[AUTH] Log API error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}