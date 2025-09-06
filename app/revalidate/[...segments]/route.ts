import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await params;
  console.log("revalidate", segments.join("/"));
  revalidatePath(`/${segments.join("/")}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
