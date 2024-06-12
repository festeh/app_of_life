import { auth } from "./auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log("Got event cookies", event.cookies.getAll(), "need", auth.sessionCookieName)
  const sessionId = event.cookies.get(auth.sessionCookieName);
  console.log(sessionId, event.cookies.getAll());
  const { session, user } = sessionId
    ? await auth.validateSession(sessionId)
    : { session: null, user: null };
  console.log("session", session, "user", user);
  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/',
      ...sessionCookie.attributes
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  if (event.route.id?.startsWith('/(app)')) {
    if (!user) redirect(301, '/signin');
  }
  console.log("Set cookies in hook", event.cookies.getAll())
  const response = await resolve(event);
  return response;
};
