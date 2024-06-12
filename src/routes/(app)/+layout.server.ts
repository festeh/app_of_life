import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  const path = event.url.pathname;
  console.log('path', path);
  if (path === '/favicon.ico') return {};
  return {};
};
