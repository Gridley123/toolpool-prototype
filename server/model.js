import itemsDb from './itemsDb';
import faker from 'faker';

const model = {
  create: (type, entity) => {
    const id = faker.random.uuid();
    entity.id = id;
    itemsDb[type].byId[id] = entity;
    itemsDb[type].allIds.push(id);
    console.log(itemsDb);
    return entity;

  },
  list: (type) => {
    return itemsDb[type].allIds.map(id => itemsDb[type].byId[id]);
  },
  get: (type, id) => {
    return itemsDb[type].byId[id];
  }
};

export default model;