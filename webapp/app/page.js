'use client';
import { useState } from 'react';
import { Sparkles, Copy, Loader2, CheckCircle, Upload } from 'lucide-react';

export default function Home() {
  // State management
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [publishing, setPublishing] = useState(false);

  /**
   * Calls the API to generate blog content
   */
  const generateContent = async () => {
    // Validate input
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }
    
    // Reset state
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // Call API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() })
      });
      
      const data = await res.json();
      
      // Handle errors
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      
      // Set results
      setResult(data);
      
    } catch (err) {
      setError(err.message);
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Copies all generated content to clipboard
   */
  const copyToClipboard = () => {
    const text = `# ${result.title}\n\n${result.content}\n\n**Meta Description:** ${result.metaDescription}\n\n**Tags:** ${result.tags.join(', ')}`;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Copy failed:', err);
        alert('Failed to copy to clipboard');
      });
  };

  /**
   * Publishes the generated blog post to WordPress
   */
  const publish = async () => {
    if (!result) return;

    setPublishing(true);
    setError(null);

    try {
      // Convert plain text content to HTML format
      // WordPress expects HTML content, so we'll convert paragraphs
      const blogHTML = result.content
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.trim()}</p>`)
        .join('\n');

      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: result.title,
          content: blogHTML,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || JSON.stringify(data.error) || 'Failed to publish to WordPress');
      }

      // Show success message with post ID if available
      const postId = data.wp?.id || 'successfully';
      alert(`Published to WordPress! Post ID: ${postId}`);
    } catch (err) {
      setError(err.message);
      console.error('Publish error:', err);
      alert(`Failed to publish: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              AI WordPress Content Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Generate SEO-optimized, professional blog posts in seconds using Groq AI
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Powered by Llama 3.3 70B - Ultra Fast AI
          </div>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What topic do you want to write about?
          </label>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError(null);
              }}
              onKeyPress={(e) => e.key === 'Enter' && !loading && generateContent()}
              placeholder="e.g., How to start a forex trading business"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              disabled={loading}
            />
            
            <button
              onClick={generateContent}
              disabled={loading || !topic.trim()}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Content
                </>
              )}
            </button>
          </div>
          
          {/* Error message */}
          {error && (
            <p className="mt-3 text-red-600 text-sm font-medium">
              ⚠️ {error}
            </p>
          )}
          
          {/* Helper text */}
          {!loading && !result && (
            <p className="mt-3 text-gray-500 text-sm">
              💡 Try topics like &quot;Best practices for remote work&quot; or &quot;Introduction to cryptocurrency trading&quot;
            </p>
          )}
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fadeIn">
            
            {/* Header with action buttons */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Generated Content
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={publish}
                  disabled={publishing}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Publish to WordPress
                    </>
                  )}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Title */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  Blog Title
                </label>
                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                  {result.title}
                </h3>
              </div>

              {/* Content */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  Content
                </label>
                <div className="prose max-w-none">
                  {result.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  SEO Meta Description
                </label>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {result.metaDescription}
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js, React, TailwindCSS, and Groq AI (Llama 3.3 70B)</p>
        </div>
        
      </div>
    </div>
  );
}
