import model from '../model';

const typeResolvers =  {
  Item: {
    tags(root) {
      if (root.tags) {
        try {
          return root.tags.map((tagId) => {
            return model.get("tags", tagId);
          })
        } catch (e) {
          console.log(e);
        }
      }
    },
    bookings(root) {
      if (root.bookings) {
        try {
          return root.bookings.map((bookingId) => {
            return model.get("bookings", bookingId)
          });
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  Booking: {
    item(root) {
      return model.get("items", root.item)
    }
  },
};