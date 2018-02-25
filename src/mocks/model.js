import itemsDb from './itemsDb';
import faker from 'faker';
import _ from 'lodash';

const model = {
  create: (type, entity) => {
    return new Promise((resolve, reject) => {
      const id = faker.random.uuid();
      entity.id = id;
      itemsDb[type].byId[id] = entity;
      itemsDb[type].allIds.push(id);
      resolve(entity);
    })

  },
  list: (type) => {
    return new Promise((resolve, reject) => {
      resolve(itemsDb[type].allIds.map(id => itemsDb[type].byId[id]));
    })
  },
  get: (type, id) => {
    return new Promise((resolve, reject) => {
      resolve(itemsDb[type].byId[id]);
    })
  },
  find: (type, field, value) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(_.find(itemsDb[type].byId, (o) => {
          return o[field] == value
        }));
      } catch(e) {
        console.error(e);
      }
    })

  }
};

export default model;