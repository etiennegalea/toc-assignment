import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // Check if query is present
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }
  
  try {
    // check if API key is set
    const api_key = process.env.NEWS_API_KEY;
    if (!api_key) {
      throw new Error('API key is not set');
    }
    
    // Fetch data from News API
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${api_key}`);
    if (!response.ok) {
      throw new Error(`News API error: ${response.statusText}`);
    }
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
