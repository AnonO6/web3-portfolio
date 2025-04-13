import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { message } = await req.json()

  // Process the message here
  console.log("Received message:", message)

  // You can add more logic here to handle different types of messages

  return NextResponse.json({ ok: true })
}
