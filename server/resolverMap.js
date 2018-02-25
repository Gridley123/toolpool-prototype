//TODO create todo-usage counter system
import model from './model';
import lodash from 'lodash';

const createItem = (_, args) => {
  async function createNewTags() {
    if (args.item.tags) {
      try {
        const { tags: createItemTagNames } = args.item;
        const dbTags = await model.list("tags");
        const currentNames = dbTags.map(currentTag => currentTag.name);
        const newTagNames = lodash.filter(createItemTagNames, (obj) => {
          return !currentNames.includes(obj);
        });
        const existingTagObjs = lodash.filter(dbTags, (dbTagObj) => {
          return createItemTagNames.includes(dbTagObj.name);
        });
        const tagCreateProms = newTagNames.map((newTagName) => {
          return model.create("tags", { name: newTagName, numberOfUses: 1 });
        });
        const tagUpdateProms = existingTagObjs.map((existingTagObj) => {
          return model.update("tags", existingTagObj.id, {numberOfUses: existingTagObj.numberOfUses+1});
        });

        return Promise.all(tagUpdateProms).then(() => {
          return Promise.all(tagCreateProms).then((createdTags) => {
            const allTags = dbTags.concat(createdTags);
            const matchedTags = lodash.filter(allTags, tagObj => lodash.includes(createItemTagNames, tagObj.name));
            return matchedTags.map((tag) => tag.id);
          })
        })

      } catch (e) {
        console.error(e);
      }
    }
  }

  return createNewTags().then((matchedTags) => {
    const { pricePerHire, pricePerDay, deposit, currency, lat, lng } = args.item;
    const modifiedArgs = {
      tags: matchedTags,
      pricePerHire: {
        amount: pricePerHire,
        currency
      },
      pricePerDay: {
        amount: pricePerDay,
        currency
      },
      deposit: {
        amount: deposit,
        currency
      },
      geolocation: lat!=null && lng!=null ? {
        lat,
        lng
      } : null,
    };

    const mergedObj = Object.assign({}, args.item, modifiedArgs);

    delete mergedObj.lat;
    delete mergedObj.lng;

    return model.create("items", mergedObj);
  })
};
// noinspection JSUnusedLocalSymbols
export default {
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
  Query: {
    getItem(_, { id }) {
      return model.get("items", id);
    },
    listItems() {
      return model.list("items");
    },
    async listTags(_, args) {
      try {
        const tagList = await model.list("tags");
        let sortedTaglist = tagList;
        if(args.sort){
          const sortedTagListASC = lodash.sortBy(tagList, [(tag) => tag.name.toLowerCase()]);
          args.sort === 'DESC' ? sortedTaglist= lodash.reverse(sortedTagListASC) : sortedTaglist = sortedTagListASC;
        }
        return sortedTaglist;

      } catch(e) {
        console.log(e);
      }
    }
  },
  Mutation: {
    createTag(_, args) {
      args.numberOfUses = 1;
      return model.create("tags", args);
    },
    createItem,
    deleteItem(_, { id }) {
      return model.delete("items", id)
    },
    editItem(_, { id, item }) {
      const edit = async () => {
        const oldObj = await model.get("items", id);
        const merged = lodash.merge(oldObj, item);
        merged.id = id;
        return model.delete("items", id).then(() => {
          return createItem("items", { item: merged });
        });
      };
      return edit();
    }

  }
}