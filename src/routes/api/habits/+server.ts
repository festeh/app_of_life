import PocketBase from 'pocketbase';


export async function POST({ locals, request }) {
  console.log("Running habits post");
  const db: PocketBase = locals.db;
  const habits_logs = db.collection('habits_logs');
  const body = await request.json();
  habits_logs.create({
    habit: body.habit,
    date: body.date,
    streak: body.streak,
    repeats: body.repeats,
  });
  return new Response("", { status: 200 });
}
