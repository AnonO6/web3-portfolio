import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("TELEGRAM_BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN ? "Set" : "Not set")
  console.log("TELEGRAM_CHAT_ID:", process.env.TELEGRAM_CHAT_ID ? "Set" : "Not set")
  try {
    const data = await req.json()
    const { username, platform, projectType } = data

    const message = `
New Hire Request:
Username: @${username} (${platform})
Project Type: ${projectType}
    `.trim()

    // Send message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    })

    if (!telegramResponse.ok) {
      throw new Error("Failed to send Telegram message")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling hire request:", error)
    return NextResponse.json({ error: "Failed to process hire request" }, { status: 500 })
  }
}
