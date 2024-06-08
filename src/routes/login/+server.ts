export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  if (!import.meta.env.VITE_EMAIL || !import.meta.env.VITE_PASSWORD) {
    return new Response('Environment variables not set', { status: 500 });
  }

  if (email === import.meta.env.VITE_EMAIL && password === import.meta.env.VITE_PASSWORD) {
    const maxAge = 12 * 30 * 24 * 60 * 60; // 1 year
    cookies.set('loggedIn', 'true', { maxAge, path: '/' });
    return new Response(null, {
      status: 200,
    });
  }

  return new Response(null, { status: 401 });
}
