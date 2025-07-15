

import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin"; // Import the Firebase admin config

export async function GET(req: NextRequest) {
  try {
    // Generate OAuth token using Firebase Admin SDK
    const token = await admin.credential.applicationDefault().getAccessToken();

    return NextResponse.json({
      accessToken: token.access_token,
      expiresIn: token.expires_in,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate access token" },
      { status: 500 }
    );
  }
}
