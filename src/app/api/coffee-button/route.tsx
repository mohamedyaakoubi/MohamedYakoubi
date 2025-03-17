import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Define the URL for the Buy Me a Coffee button
    const buttonUrl = 'https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=medykb&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff';
    
    // Fetch the image
    const response = await fetch(buttonUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    // Get the image data as an array buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Create a new response with the image data
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error fetching coffee button:', error);
    return new NextResponse('Failed to fetch coffee button image', { status: 500 });
  }
}