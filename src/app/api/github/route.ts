import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    console.log(`API route: Fetching repos for ${username}`);
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'mohamed-portfolio',
          ...(process.env.GITHUB_TOKEN 
            ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } 
            : {})
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error: ${response.status}`, errorText);
      return NextResponse.json({ 
        error: `GitHub API responded with status: ${response.status}` 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch repos' 
    }, { status: 500 });
  }
}