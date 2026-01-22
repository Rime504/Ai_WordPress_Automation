import './globals.css'

export const metadata = {
  title: 'AI WordPress Content Generator',
  description: 'Generate SEO-optimized blog posts in seconds using Groq AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
