import { NextRequest, NextResponse } from 'next/server'

// Configure environment variables
const TAX_API_URL = process.env.TAX_API_URL 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query } = body

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Call the Tax/Legal API
    const response = await fetch(`${TAX_API_URL}/process-tax-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.detail || 'Error processing legal query' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // If your backend doesn't return data in the expected format,
    // you can transform it here before returning
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing legal query:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}