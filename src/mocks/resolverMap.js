import model from './model';
import lodash from 'lodash';

export default {
  Item: {
    tags(root) {
      return root.tags.map((tagId) => {
        return model.get("tags", tagId);
      })
    },
    bookings(root) {
      return root.bookings.map((bookingId) => {
        return model.get("bookings", bookingId)
      })
    }
  },
  Booking: {
    item(root) {
      return model.get("items", root.item)
    }
  },
  Query: {
    getItem(_, { id }) {
      return model.get("items", id);
    },
    listItems() {
      return model.list("items");
    },
    listTags() {
      return model.list("tags");
    }
  },
  Mutation: {
    createTag(_, args) {
      return model.create("tags", args);
    },
    createItem(_, args) {
      async function createNewTags() {
        console.log(args);
        if (args.item.tags) {
          try {
            const { tags } = args.item;
            const currentTags = await model.list("tags");
            let newTagNames = [];
            const currentNames = currentTags.map(currentTag => currentTag.name);
            for (const tag of tags) {
              if (!currentNames.includes(tag)) {
                newTagNames.push(tag);
              }
              else {
              }
            }
            const tagCreateProms = newTagNames.map((newTagName) => {
              return model.create("tags", { name: newTagName, numberOfUses: 1 });
            });

            return Promise.all(tagCreateProms).then((createdTags) => {
              const allTags = currentTags.concat(createdTags);
              const matchedTags = lodash.filter(allTags, o => lodash.includes(tags, o.name));
              return matchedTags.map((tag) => tag.id);
            })
          } catch (e) {
            console.error(e);
          }
        }
      }

      return createNewTags().then((matchedTags) => {
        const modifiedArgs = Object.assign(args.item);
        modifiedArgs.tags = matchedTags;
        return model.create("items", modifiedArgs);
      })

    }
  }
}