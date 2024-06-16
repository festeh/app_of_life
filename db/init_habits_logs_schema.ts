import {auth} from './auth';
import {db_exists, db_empty, db_create} from './db';
const pb = await auth();
console.log('Auth done');

const habitsExists = await db_exists(pb, 'habits');
if (!habitsExists) {
  process.exit(0);
}

const habitsLogsExists = await db_exists(pb, 'habits_logs');
if (habitsLogsExists) {
  const dbEmpty = await db_empty(pb, 'habits_logs');
  if (!dbEmpty) {
    console.log('Collection habits_logs already exists and is not empty');
    process.exit(0);
  }
  await pb.collections.delete('habits_logs');
  console.log('Collection habits_logs deleted');
}
const habitsId = (await pb.collections.getOne('habits')).id;
const schema = [
  { name: 'habit', type: 'relation', options: { collectionId: habitsId, maxSelect: 1 } },
  { name: 'date', type: 'date', required: true },
  { name: 'result', type: 'select', options: { values: ['plus', 'minus', 'zero'], maxSelect: 1 } },
  { name: 'streak', type: 'number', default: 0},
  { name: 'repeats', type: 'number', default: 1 },
];

await db_create(pb, 'habits_logs', schema);
