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

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || err },
      { status: 500 }
    );
  }
}
