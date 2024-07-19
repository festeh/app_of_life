
export const load = (async ({ locals }) => {
  console.log("Running habits load");
  const db = locals.db;
  console.log(db);
  const habits = await db.collection("habits").getFullList();
  console.log("Habits loaded");
  console.log(habits);
  return {
    habits
  };
});
