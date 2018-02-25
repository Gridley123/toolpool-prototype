import model from './model';
import itemsDb from './itemsDb';

test('find', () => {
  model.find("tags", "name", "building").then((res) => {
    expect(res).toMatchObject({id: 2, name: "building"});
  })
})

test('model.find is a function', () => {
  expect(model.find).toBeInstanceOf(Function);
})

test('model.update correctly updates an item', () => {
  expect(itemsDb.items.byId[1]).toEqual({
    "id": 1,
      "status": "PUBLISHED",
      "name": "Sledgehammer",
      "description": "For smashing stuff up",
      "tags": [
      1, 2
    ],
      "pricePerHire": {
      "amount": 10,
        "currency": "GBP"
    },
    "pricePerDay": {
      "amount": 5,
        "currency": "GBP"
    },
    "deposit":
    {
      "amount": 20,
      "currency": "GBP"
    },
    //I have used the "location" part of a google geocoding location return here
    "geolocation": {
      "lat": 37.4224764,
        "lng": -122.0842499
    },
    "bookings": [
      3
    ]
  });

  const updatedObj = {
    name: "ClawHammer",
    pricePerHire: {
      amount: 13
    },
    geolocation: {
      lat: 1,
      lng: 2
    },
    tags: [1,3],
  }
  model.update("items", 1, updatedObj);

  expect(itemsDb.items.byId[1]).toEqual({
    "id": 1,
    "status": "PUBLISHED",
    "name": "ClawHammer",
    "description": "For smashing stuff up",
    "tags": [
      1, 3
    ],
    "pricePerHire": {
      "amount": 13,
      "currency": "GBP"
    },
    "pricePerDay": {
      "amount": 5,
      "currency": "GBP"
    },
    "deposit":
      {
        "amount": 20,
        "currency": "GBP"
      },
    //I have used the "location" part of a google geocoding location return here
    "geolocation": {
      "lat": 1,
      "lng": 2
    },
    "bookings": [
      3
    ]
  });
})