
export const load = (async ({ locals }) => {
  console.log("Running habits load");
  const db = locals.db;
  const habits = await db.collection("habits").getFullList();
  return {
    habits
  };
});
