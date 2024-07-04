import { auth } from "../../../auth";
import { redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types"
import { auth_db, get_db } from "$lib/db";

const login: Action = async ({ request, cookies }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  if (email !== import.meta.env.VITE_EMAIL || password !== import.meta.env.VITE_PASSWORD) {
    console.log("Invalid email or password")
    return redirect(301, '/signin');
  }
  const key = email;
  const session = await auth.createSession(
    key, {}
  );
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: "/",
    ...sessionCookie.attributes
  });
  const db = get_db();
  auth_db(db);
  const token = db.authStore.token;
  cookies.set('pb_auth', JSON.stringify({ token }), {
    path: '/',
    ...sessionCookie.attributes
  });
  redirect(302, '/');
};

export const actions: Actions = { login }
