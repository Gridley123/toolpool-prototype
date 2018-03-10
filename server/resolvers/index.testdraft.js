// import resolverMap from './index';
// import itemsDb from '../itemsDb';
// import model from '../model';
//
// jest.genMockFromModule('./model');
// model.delete = jest.fn(() => Promise.resolve());
//
// beforeEach(
//   () => {
//     jest.resetModules();
//     console.log('itemsDb items length:', itemsDb.items.allIds.length);
//   }
// );
//
// test('createItem creates a new tag if the tag does not already exist', () => {
//   const args = {
//     id: null,
//     item: {
//       name: "Test1",
//       tags: ["hammer", "newTag"],
//       status: "DRAFT",
//       currency: "GBP"
//     }
//   };
//
//   expect(Object.keys(itemsDb.tags.byId).length).toBe(3);
//
//   const create = async () => {
//     try {
//       return await resolverMap.Mutation.createItem(null, args);
//     } catch (e) {
//       console.error(e);
//     }
//   };
//
//   return create().then(() => {
//     expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({
//       "id": expect.anything(),
//       numberOfUses: 1, name: "newTag"
//     }));
//   }, (err) => console.log(err));
//
//
// });
//
// test('createItem updates the numberOfUses for a current tag if it exists', () => {
//   const args = {
//     id: null,
//     item: {
//       name: "Test1",
//       tags: ["metalwork", "newTag"],
//       status: "DRAFT",
//       currency: "GBP"
//     }
//   };
//
//
//   const create = async () => {
//     try {
//       return await resolverMap.Mutation.createItem(null, args);
//     } catch (e) {
//       console.error(e);
//     }
//   };
//
//   return create().then(() => {
//     expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({
//       "id": 1,
//       numberOfUses: 2, name: "hammer"
//     }));
//     expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({
//       "id": 3,
//       numberOfUses: 3, name: "metalwork"
//     }));
//     expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({
//       "id": expect.anything(),
//       numberOfUses: 2, name: "newTag"
//     }));
//   }, (err) => console.log(err));
//
//
// });
//
// test('createItem creates a new item and uses an existing tag if it matches', () => {
//   const args = {
//     id: null,
//     item: {
//       name: "Test1",
//       tags: ["hammer", "newTag"],
//       status: "DRAFT",
//       currency: "GBP"
//     }
//   };
//
//   return resolverMap.Mutation.createItem(null, args).then(() => {
//     expect(Object.values(itemsDb.items.byId)).toContainEqual(expect.objectContaining({
//       id: expect.any(String),
//       tags: [1, expect.anything()],
//       status: "DRAFT",
//       currency: "GBP"
//     }))
//   })
// });
//
// test('createItem returns the new item', () => {
//   const args = {
//     id: null,
//     item: {
//       name: "Test1",
//       tags: ["hammer", "newTag"],
//       status: "DRAFT",
//       currency: "GBP"
//     }
//   };
//
//
//   return resolverMap.Mutation.createItem(null, args).then((result) => {
//     expect(result).toEqual(expect.objectContaining({
//       id: expect.any(String),
//       name: "Test1",
//       tags: [expect.anything(), expect.anything()],
//       status: "DRAFT",
//       currency: "GBP",
//     }))
//   })
// });
//
// test('edit Item correctly calls the model', () => {
//
//   const args = {
//     id: 1,
//     item: {
//       name: "Test1",
//       tags: ["hammer", "newTagFromUpdate"],
//       status: "DRAFT",
//       currency: "GBP"
//     }
//   };
//
//   expect(Object.keys(itemsDb.tags.byId).length).toBe(4);
//
//   return resolverMap.Mutation.editItem(null, args).then(() => {
//     expect(model.delete.mock.calls.length).toBe(1);
//     expect(model.delete.mock.calls[0]).toEqual(['items', 1]);
//
//     expect(Object.values(itemsDb.tags.byId)).toContainEqual(expect.objectContaining({
//       "id": expect.anything(),
//       numberOfUses: 1, name: "newTagFromUpdate"
//     }));
//   }, (err) => console.log(err));
// });
//
// test('listTags(ASC) correctly sorts the tags', () => {
//
//   const args = {
//     sort: 'ASC'
//   };
//
//   const expectedResult = [
//     { id: 2, name: 'building', numberOfUses: 1 },
//     { id: 1, name: 'hammer', numberOfUses: 5 },
//     { id: 3, name: 'metalwork', numberOfUses: 3 },
//     {
//       name: 'newTag',
//       numberOfUses: 4,
//       id: expect.anything()
//     },
//     {
//       name: 'newTagFromUpdate',
//       numberOfUses: 1,
//       id: expect.anything()
//     }
//   ]
//
//   expect(Object.keys(itemsDb.tags.byId).length).toBe(5);
//
//   return resolverMap.Query.listTags(null, args).then((result) => {
//     expect(result).toEqual(expectedResult);
//   })
// });
//
// test('listTags(DESC) correctly sorts the tags', () => {
//
//   const args = {
//     sort: 'DESC'
//   };
//
//   const expectedResult = [{
//     name: 'newTagFromUpdate',
//     numberOfUses: 1,
//     id: expect.anything(),
//   },
//     {
//       name: 'newTag',
//       numberOfUses: 4,
//       id: expect.anything(),
//     },
//     { id: 3, name: 'metalwork', numberOfUses: 3 },
//     { id: 1, name: 'hammer', numberOfUses: 5 },
//     { id: 2, name: 'building', numberOfUses: 1 }]
//
//   expect(Object.keys(itemsDb.tags.byId).length).toBe(5);
//
//   return resolverMap.Query.listTags(null, args).then((result) => {
//     expect(result).toEqual(expectedResult);
//   })
// });