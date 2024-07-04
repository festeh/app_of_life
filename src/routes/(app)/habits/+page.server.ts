
export const load = (async ({ locals }) => {
  const db = locals.db;
  const habits = await db.collection("habits").getFullList();
  return {
    habits
  };
});
