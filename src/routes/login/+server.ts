
export async function POST({ request }) {
  const { email, password } = await request.json();
  console.log('email', email, import.meta.env);
  if (email === import.meta.env.VITE_EMAIL && password === import.meta.env.VITE_PASSWORD) {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    return new Response(null, {
      status: 200,
      headers: {
        'Set-Cookie': `loggedIn=true; Path=/; HttpOnly Max-Age=${maxAge}`,
      },
    });
  }

  return new Response(null, { status: 401 });
}
