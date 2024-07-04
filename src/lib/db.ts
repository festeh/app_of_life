import PocketBase from 'pocketbase';


export const DB_URL = import.meta.env.VITE_POCKETBASE_URL;

export function get_db() {
  return new PocketBase(DB_URL);
}

export function auth_db(pb: PocketBase) {
  return pb.admins.authWithPassword(
    import.meta.env.VITE_EMAIL,
    import.meta.env.VITE_POCKETBASE_PASSWORD
  );
}
