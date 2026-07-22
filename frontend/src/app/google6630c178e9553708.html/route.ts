export function GET() {
  return new Response('google-site-verification: google6630c178e9553708.html', {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
