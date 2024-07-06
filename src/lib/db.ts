import PocketBase from 'pocketbase';


export const DB_URL = import.meta.env.VITE_POCKETBASE_URL;

export function getDB() {
  return new PocketBase(DB_URL);
}

export async function authDB(pb: PocketBase) {
  console.log(import.meta.env.VITE_POCKETBASE_PASSWORD);
  console.log(import.meta.env.VITE_EMAIL);
  const authRes = await pb.admins.authWithPassword(
    import.meta.env.VITE_EMAIL,
    import.meta.env.VITE_POCKETBASE_PASSWORD
  );
  return authRes;
}
