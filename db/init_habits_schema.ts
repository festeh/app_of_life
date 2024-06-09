import dotenv from 'dotenv';
import PocketBase from 'pocketbase';

dotenv.config();

const db_url: string = process.env.VITE_POCKETBASE_URL!;
const db_email = process.env.VITE_EMAIL!;
const db_password = process.env.VITE_POCKETBASE_PASSWORD!;

const pb = new PocketBase(db_url)
const authData = await pb.admins.authWithPassword(
  db_email,
  db_password
);

// check if collection habits exists
let habitCollection = null;
try {
  habitCollection = await pb.collections.getOne('habits');
} catch (error) {
  console.log('Collection habits does not exist');
}
if (habitCollection !== null) {
  const list = await pb.collection("habits").getList(1, 1)
  if (list.items.length === 0) {
    await pb.collections.delete(habitCollection.id);
    console.log('Collection habits deleted');
  } else {
    console.log('Collection habits already exists and is not empty');
    process.exit(0);
  }
}

const oldSchema = [
  { name: 'description', type: 'text', required: true },
];

const col = await pb.collections.create({
  name: 'habits',
  type: 'base',
  schema: oldSchema,
});
console.log('Collection habits created');
const newSchema = oldSchema.concat([
  { name: 'parent', type: 'relation', options: { collectionId: col.id, maxSelect: 1 } }])
console.log(newSchema);
await pb.collections.update(col.id,
  { schema: newSchema })
console.log('Collection habits updated');

