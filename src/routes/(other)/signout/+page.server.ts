import { redirect } from '@sveltejs/kit';
import { auth } from '../../../auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    const session = locals.session;
    if (!session) {
      throw redirect(302, '/signin');
    }
    await auth.invalidateSession(locals.session.id); // invalidate session
    const sessionCookie = auth.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes
    });
    throw redirect(302, '/signin');
  }
};
