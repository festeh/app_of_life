import { DB_URL, get_db } from "$lib/db";
import { auth } from "./auth";
import { redirect, type Handle } from "@sveltejs/kit";
import PocketBase from 'pocketbase';


function eraseCookie(event) {
  const blankCookie = auth.createBlankSessionCookie();
  event.cookies.set(blankCookie.name, blankCookie.value, {
    path: '/',
    ...blankCookie.attributes
  });
}

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(auth.sessionCookieName);
  const { session, user } = sessionId
    ? await auth.validateSession(sessionId)
    : { session: null, user: null };
  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    eraseCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;
  if (event.route.id?.startsWith('/(app)')) {
    if (!user) redirect(301, '/signin');
  }
  const db = get_db();
  const db_cookie = event.cookies.get('pb_auth');
  let dbLoaded = false;
  if (db_cookie) {
    db.authStore.loadFromCookie(db_cookie);
  }
  if (db.authStore.isValid) {
    dbLoaded = true;
  }
  if (!dbLoaded && event.route.id?.startsWith('/(app)')) {
    eraseCookie(event);
    console.log('redirecting to signin');
    redirect(301, '/signin');
  }

  event.locals.db = db;

  const response = await resolve(event);
  return response;
};
