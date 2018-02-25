import model from './model';

export default {
  Query: {
    getItem(_, { id }) {
      return model.get("items", id);
    }
  }
}