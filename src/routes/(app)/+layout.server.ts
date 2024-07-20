import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  const path = event.url.pathname;
  if (path === '/favicon.ico') return {};
  return {};
};
