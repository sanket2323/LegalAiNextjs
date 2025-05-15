import { NextRequest, NextResponse } from 'next/server';

// Get the environment variable for the Tax API URL
const TAX_API_URL = process.env.TAX_API_URL || 'http://0.0.0.0:8001';

export async function POST(req: NextRequest) {
  try {
    // Get the query from the request body
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Call the Tax/Legal API
    const response = await fetch(`${TAX_API_URL}/process-tax-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || 'Error processing tax query' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing tax query:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}