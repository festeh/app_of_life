
export const load = (async ({ locals }) => {
  console.log("Running habits load");
  const db = locals.db;
  const habits = await db.collection("habits").getFullList();
  const habits_logs = db.collection('habits_logs');
  const last_week_date = new Date();
  last_week_date.setDate(last_week_date.getDate() - 7);
  last_week_date.setHours(0, 0, 0, 0);
  const last_week_date_formatted = last_week_date.toISOString().replace('T', ' ').substring(0, 19);
  const filter = `created > "${last_week_date_formatted}"`;
  console.log(filter);
  const logs_last_week = await habits_logs.getFullList({
    filter
  })
  return {
    habits,
    logs: logs_last_week,
  };
});
