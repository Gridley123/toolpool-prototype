import faker from 'faker';
import { GraphQLDate } from 'graphql-iso-date';

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
  Date: () => new Date(),
};

export default mocks;
