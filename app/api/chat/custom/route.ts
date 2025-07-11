import { NextResponse } from 'next/server'
import { callLLM } from '../../../../src/utils/llm'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json()
    const result = await callLLM(model, messages)
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
