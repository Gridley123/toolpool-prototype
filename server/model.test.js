import model from './model';

test('find', () => {
  model.find("tags", "name", "building").then((res) => {
    expect(res).toMatchObject({id: 2, name: "building"});
  })
})

test('model.find is a function', () => {
  expect(model.find).toBeInstanceOf(Function);
})