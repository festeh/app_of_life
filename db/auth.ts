import dotenv from 'dotenv';
import PocketBase from 'pocketbase';


export async function auth() {
  dotenv.config();

  const db_url: string = process.env.VITE_POCKETBASE_URL!;
  const db_email = process.env.VITE_EMAIL!;
  const db_password = process.env.VITE_POCKETBASE_PASSWORD!;

  const pb = new PocketBase(db_url)
  const authData = await pb.admins.authWithPassword(
    db_email,
    db_password
  );
  return pb;
}
