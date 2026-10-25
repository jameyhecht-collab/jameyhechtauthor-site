export default async function handler() {
  try {
    const response = await fetch('https://jameyhecht.substack.com/feed', {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Feed returned ${response.status}`);
    const xml = await response.text();
    if (!/<rss[\s>]/i.test(xml)) throw new Error('Invalid RSS response');
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      },
    });
  } catch {
    return new Response('Substack feed temporarily unavailable', { status: 502 });
  }
}
