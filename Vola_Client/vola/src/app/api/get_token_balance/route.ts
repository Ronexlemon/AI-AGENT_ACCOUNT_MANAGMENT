import { get_Token_User_Balance } from "@/contract/contract";
import { RPC } from "@/rpc/rpc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const chainId = searchParams.get("chainId");
    const tokenAddress = searchParams.get("tokenAddress");
    const userAddress = searchParams.get("userAddress");

    if (!chainId || !tokenAddress || !userAddress) {
      return NextResponse.json({ error: "Invalid or missing parameters" }, { status: 400 });
    }

    // Uncomment this when get_Token_User_Balance is ready
    const balance = await get_Token_User_Balance(
      chainId as keyof typeof RPC,
      tokenAddress,
      userAddress
    );

    console.log("Fetched Balance:", balance);

    return NextResponse.json({ balance }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
