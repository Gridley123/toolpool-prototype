import itemsDb from './itemsDb';
import faker from 'faker';
import _ from 'lodash';

const model = {
  create: (type, entity) => {
    return new Promise((resolve, reject) => {
      if (!entity.hasOwnProperty("id") || entity.id === undefined ||  entity.id === null) {
        id = faker.random.uuid();
        entity.id = id;
      } else {
        id = entity.id;
      }
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
      } catch (e) {
        console.error(e);
      }
    })
  },
  delete: (type, id) => {
    return new Promise((resolve, reject) => {
      try {
        const copy = Object.assign({}, itemsDb[type].byId[id]);
        _.unset(itemsDb[type].byId, id);
        _.remove(itemsDb[type].allIds, ident => ident == id);
        resolve(copy)
      } catch (e) {
        reject(e);
      }
    })
  },
  update: (type, id, updatedObj) => {
    return new Promise((resolve, reject) => {
      try {
        const entry = itemsDb[type].byId[id];
        itemsDb[type].byId[id] = _.merge(entry, updatedObj);
        resolve(itemsDb[type].byId[id]);
      } catch (e) {
        reject(e);
      }
    })
  }
};

export default model;