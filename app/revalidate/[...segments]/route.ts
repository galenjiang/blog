import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { segments: string[] } }) {
  console.log('revalidate', params.segments.join('/'))
  revalidatePath(`/${params.segments.join('/')}`)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}