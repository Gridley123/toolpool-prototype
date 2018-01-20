import faker from 'faker';

const mocks = {
  String: () => faker.random.word(),
  Price: () => ({
    amount: faker.finance.amount(),
    currency: 'GBP'
  }),
  Item: () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
  }),
};

export default mocks;
