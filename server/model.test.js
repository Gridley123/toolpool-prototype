import {Items} from './model';

const context = {
  connector: {
    set: jest.fn()
    get: jest.fn()
  }
}

const itemModel = new Items(context);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Items", function () {
  describe("createTag", function () {
    it("calls the connector's set method once with the required arguments", function () {

      const testItem = {
        name: 'TestName',
        description: 'Lorem Ipsum'
      }
      itemModel.createItem(testItem);
      console.log(context.connector.set.mock);
      expect(context.connector.set.mock.calls).toEqual([['items', testItem]]);
    });

    it("calls the Tag.createTag method if the tag name does not already exist", function () {
      const testItem = {
        name: 'Testname',
        tags: ['existingName']
      };
      context.connector.get.mockReturnValue(null);
      itemModel.createItem(testItem);


    });

    it("Returns an item with a generated id", function () {

    })
  })
})