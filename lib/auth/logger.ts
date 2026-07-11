"use client";

type LogLevel = "info" | "warn" | "error" | "success";

export const logToServer = async (message: string, level: LogLevel = "info") => {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, level }),
    });
  } catch (error) {
    console.error("Failed to send log to server:", error);
  }
};