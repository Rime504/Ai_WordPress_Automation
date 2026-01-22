import Groq from 'groq-sdk';

/**
 * POST /api/generate
 * Generates blog content using Groq AI
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
      return Response.json(
        { error: 'Topic is required' }, 
        { status: 400 }
      );
    }

    // Validate API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey.trim().length === 0 || apiKey === 'your_groq_api_key_here') {
      return Response.json(
        { error: 'GROQ_API_KEY environment variable is missing or not configured. Please check your .env.local file and restart the dev server.' }, 
        { status: 500 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: apiKey,
    });

    // Call Groq API with Llama model
    const chatCompletion = await groq.chat.completions.create({
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
    });

    // Extract response
    const responseText = chatCompletion.choices[0]?.message?.content || '';
    
    // Find JSON object in response (handles cases where AI adds extra text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }
    
    const blogData = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!blogData.title || !blogData.content || !blogData.metaDescription || !blogData.tags) {
      throw new Error('Invalid response structure from AI');
    }

    // Ensure tags is an array
    if (!Array.isArray(blogData.tags)) {
      blogData.tags = [];
    }

    return Response.json(blogData);
    
  } catch (error) {
    console.error('Generation error:', error);
    
    // Provide helpful error messages
    if (error.message.includes('API key')) {
      return Response.json(
        { error: 'API key is missing or invalid. Please check your environment variables.' }, 
        { status: 500 }
      );
    }
    
    return Response.json(
      { error: error.message || 'Failed to generate content. Please try again.' }, 
      { status: 500 }
    );
  }
}
