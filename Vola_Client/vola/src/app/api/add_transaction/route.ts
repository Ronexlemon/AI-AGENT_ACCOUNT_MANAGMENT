import { NextRequest, NextResponse } from "next/server";
import { VolaAgentURL } from "@/constant/url";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { private_key, amount, buy_token, sell_token, duration, percentage } = body;

    // Validate required fields
    if (!private_key || !amount || !buy_token || !sell_token || !duration || !percentage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const url = `${VolaAgentURL}/add_transaction`;
    const requestData = {
      private_key,
      amount,
      buy_token,
      sell_token,
      duration,
      percentage,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
