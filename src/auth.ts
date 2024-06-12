import { Lucia } from "lucia";
import { dev } from "$app/environment";

import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";

const db = sqlite();

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id TEXT NOT NULL PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS session (
        id TEXT NOT NULL PRIMARY KEY,
        expires_at INTEGER NOT NULL,
        user_id TEXT NOT NULL
    );
`);

db.prepare("INSERT INTO user (id) VALUES(?)").run(
				import.meta.env.VITE_EMAIL,
			);

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session"
});

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
      secure: !dev,
		},
    expires: false
	}
});

export type Auth = typeof auth;
