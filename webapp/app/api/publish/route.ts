import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const auth = Buffer.from(
      `${process.env.WP_USER}:${process.env.WP_APP_PASS}`
    ).toString("base64");

    const res = await fetch(`${process.env.WP_API_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        status: "publish",
      }),
    });

    const data = await res.text();

    try {
      const json = JSON.parse(data);
      if (!res.ok) {
        throw new Error(json.message || data);
      }
      return NextResponse.json(json);
    } catch (e) {
      throw new Error(`WordPress Error: ${data.substring(0, 200)}...`);
    }

  } catch (err: any) {
    console.error("Publish Error:", err);
    return NextResponse.json(
      { error: err.message || err },
      { status: 500 }
    );
  }
}
