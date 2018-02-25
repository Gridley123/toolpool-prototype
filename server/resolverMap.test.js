import resolverMap from './resolverMap';
import itemsDb from './itemsDb';
import _ from 'lodash';

test('createItem creates a new tag if the tag does not already exist', () => {
  const args = {
    id: null,
    item: {
      name: "Test1",
      tags: ["hammer", "newTag"],
      status: "DRAFT",
      currency: "GBP"
    }
  };


  expect(Object.keys(itemsDb.tags.byId).length).toBe(3);

  const create = async () => {
    try {
      return await resolverMap.Mutation.createItem(null, args);
    } catch(e) {
      console.error(e);
    }
  }

  return create().then((value) => {
    expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({ "id": expect.anything(),
      numberOfUses: 1, name: "newTag" }));
  }, (err) => console.log(err));


});

test('createItem creates a new item and uses an existing tag if it matches', () => {
  const args = {
    id: null,
    item: {
      name: "Test1",
      tags: ["hammer", "newTag"],
      status: "DRAFT",
      currency: "GBP"
    }
  };

  return resolverMap.Mutation.createItem(null, args).then(() => {
    expect(Object.values(itemsDb.items.byId)).toContainEqual(expect.objectContaining({
      id: expect.any(String),
      tags: [expect.anything(), expect.anything()],
      status: "DRAFT",
      currency: "GBP"
    }))
  })
})

test('createItem returns the new item', () => {
  const args = {
    id: null,
    item: {
      name: "Test1",
      tags: ["hammer", "newTag"],
      status: "DRAFT",
      currency: "GBP"
    }
  };


  return resolverMap.Mutation.createItem(null, args).then((result) => {
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: "Test1",
      tags: [expect.anything(), expect.anything()],
      status: "DRAFT",
      currency: "GBP",
    }))
  })
})

