import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = (await query("SELECT * FROM users WHERE email = ?", [email])) as any[]

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Generate UUID for user
    const userId = uuidv4()

    // Insert new user
    await query("INSERT INTO users (id, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)", [
      userId,
      firstName,
      lastName,
      email,
      passwordHash,
    ])

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
