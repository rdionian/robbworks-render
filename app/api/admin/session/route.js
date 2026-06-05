import { NextResponse } from "next/server";
import { getSignedCookie, verifySignedCookieNode } from "@/lib/auth";

export async function GET(request) {
  const c = getSignedCookie(request);
  const ok = verifySignedCookieNode(c);
  return NextResponse.json({ admin: ok });
}
export const runtime = "nodejs";
