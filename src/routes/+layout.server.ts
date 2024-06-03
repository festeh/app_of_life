import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
  const loggedIn = cookies.get('loggedIn');

  if (!loggedIn && url.pathname !== '/login') {
    throw redirect(302, '/login');
  }

  return {
    loggedIn: loggedIn === 'true',
  };
}
