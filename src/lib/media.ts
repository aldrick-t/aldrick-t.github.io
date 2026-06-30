export function getYouTubeEmbedUrl(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const hostname = parsed.hostname.replace(/^www\./, '');
  let videoId: string | undefined;

  if (hostname === 'youtu.be') {
    videoId = parsed.pathname.split('/').filter(Boolean)[0];
  } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    const [, route, id] = parsed.pathname.split('/');
    if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v') ?? undefined;
    if (route === 'embed' || route === 'shorts') videoId = id;
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return undefined;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}
