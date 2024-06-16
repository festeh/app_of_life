import {auth} from './auth';
import {db_exists, db_empty, db_create} from './db';
const pb = await auth();
console.log('Auth done');

const pomosExists = await db_exists(pb, 'pomos');
if (pomosExists) {
  const dbEmpty = await db_empty(pb, 'pomos');
  if (!dbEmpty) {
    console.log('Collection pomos already exists and is not empty');
    process.exit(0);
  }
  await pb.collections.delete('pomos');
  console.log('Collection pomos deleted');
}

const schema = [
  { name: 'time', type: 'date', required: true },
  { name: 'task', type: 'text' },
  { name: 'project', type: 'text'},
  { name: 'status', type: 'select', options: { values: ['finished', 'started', 'cancelled'], maxSelect: 1 }, required: true },
  { name: 'metadata', type: 'json', options: { maxSize: 512 } },
];

await db_create(pb, 'pomos', schema);
