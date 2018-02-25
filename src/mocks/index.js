import faker from 'faker';
import model from './model';

// noinspection JSUnusedLocalSymbols
const mockResolvers = {
  // String: () => faker.random.word(),
  Price: () => ({
    amount: faker.finance.amount(),
    currency: 'GBP',
  }),
  Item: () => ({
    tags: (root, item) => {
      return root.tags.map((tagId) => {
        return model.get("tags", tagId);
      })
    }

  }),
  Date: () => new Date(),
  Tag: (parentValue) => {
    return {id: faker.random.number(), name: faker.random.word(), numberOfUses: faker.random.number()};
  },
  Mutation: () => ({
    createItem: (_, { item }) => {
      return model.create("items", item);
    }
  }),
  Query: () => ({
    listItems: () => {
      const items = model.list("items");
      return items.map((item) => {
        const resolvedTags = item.tags? item.tags.map(tagId => model.get("tags", tagId)) : null;
        const resolvedBookings = item.bookings ? item.bookings.map(bookingId => model.get("bookings", bookingId)): null;
        item.tags = resolvedTags;
        item.bookings = resolvedBookings;
        return item;
      })
    },
    listBookings: () => {
      const bookings = model.list("bookings");
      return bookings.map((booking) => {
        booking.items =  model.get("bookings", booking.item);
        return booking;
      })
    },
    getItem: (_, { id }) => {
      return model.get("items", id);
    }
  })
};

export default mockResolvers;

