import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json()

  console.log('revalidate', data.url)
  revalidatePath(data.url)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}