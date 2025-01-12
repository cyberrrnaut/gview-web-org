import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import {GenerateUniqueAvatar} from "@/lib/randomAvatar"
 const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, address, name } = body;

    // Validate required fields
    if (!email && !address) {
      return NextResponse.json({ error: "Email or wallet address is required" }, { status: 400 });
    }

    // Check if user already exists with email or wallet address
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { walletAddress: address }],
      },
    });

    // If the user exists, create a new session token
    if (existingUser) {
      const sessionToken = uuidv4(); // more secure way of session token generation

      // Update session token in the user record
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { sessionToken },
      });

      // Set session cookie and send response
      const response = NextResponse.json({
        message: "User logged in",
        user: existingUser,
      });

      response.cookies.set("session_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Make sure cookies are only sent over HTTPS in production
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // Session expiry time (7 days)
      });

      return response;
    }

    // If the user doesn't exist, create a new user
    const sessionToken = uuidv4(); // Consider a more secure method here

     
    const avatarUrl = GenerateUniqueAvatar();
    const newUser = await prisma.user.create({
      data: {
        email : email ,
        walletAddress: address ,
        name: name || "New User",
        avatar: avatarUrl,
        sessionToken,
      },
    });

    // Set session cookie and send response
    const response = NextResponse.json({
      message: "User created",
      user: newUser,
    });

    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Session expiry time (7 days)
    });

    return response;
  } catch (error) {
    console.error("Error in /api/auth:", error);
    // Provide a more descriptive error message based on the error
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
