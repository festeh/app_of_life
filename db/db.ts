
export async function db_exists(pb, name: string) {
  try {
    await pb.collections.getOne(name);
    return true;
  } catch (error) {
    console.log(`Collection ${name} does not exist`)
    return false;
  }
}

export async function db_empty(pb, name: string) {
  const list = await pb.collection(name).getList(1, 1)
  if (list.items.length === 0) {
    return true;
  } else {
    return false;
  }
}

export async function db_create(pb, name: string, schema: any) {
  const col = await pb.collections.create({
    name: name,
    type: 'base',
    schema: schema,
  });
  console.log(`Collection ${name} created`);
  return col;
}
