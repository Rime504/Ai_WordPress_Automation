import { NextResponse } from 'next/server';

/**
 * POST /api/generate
 * Generates blog content using Groq AI via direct fetch
 * 
 * Input: { topic: string }
 * Output: { title, content, metaDescription, tags }
 */
export async function POST(request) {
  try {
    // Parse request body
    const { topic } = await request.json();

    // Validate input
    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Validate API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey.trim().length === 0 || apiKey.includes('your_groq_api_key')) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY environment variable is missing or not configured.' },
        { status: 500 }
      );
    }

    // Call Groq API directly using fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: `You are an expert WordPress content creator and SEO specialist.

Generate a complete, professional blog post about: "${topic}"

CRITICAL: Return ONLY a valid JSON object with this EXACT structure (no markdown, no extra text, no code blocks):
{
  "title": "Compelling, SEO-optimized blog post title with relevant keywords",
  "content": "Well-written blog post content between 400-600 words. Use clear paragraphs separated by \\n\\n. Make it engaging, informative, and valuable to readers. Include practical tips and examples.",
  "metaDescription": "Compelling meta description between 150-160 characters that summarizes the post and includes keywords",
  "tags": ["relevant-tag-1", "relevant-tag-2", "relevant-tag-3", "relevant-tag-4", "relevant-tag-5"]
}

Make the content professional, engaging, and optimized for search engines. Focus on providing real value to readers.`
        }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || '';

    // Parse JSON safely
    let blogData;
    try {
      blogData = JSON.parse(responseText);
    } catch (e) {
      // Fallback regex extraction if exact JSON parsing fails
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        blogData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse JSON from AI response');
      }
    }

    // Validate response structure
    if (!blogData.title || !blogData.content) {
      throw new Error('Invalid response structure from AI');
    }

    // Ensure tags is an array
    if (!Array.isArray(blogData.tags)) {
      blogData.tags = [];
    }

    return NextResponse.json(blogData);

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content.' },
      { status: 500 }
    );
  }
}
