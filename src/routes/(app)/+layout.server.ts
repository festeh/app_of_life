import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  const path = event.url.pathname;
  console.log('path', path);
  if (path === '/favicon.ico') return {};
  const session = await event.locals.auth();
  console.log('session', session);
  if (!session?.user) throw redirect(303, '/auth/signin');
  return {};
};
