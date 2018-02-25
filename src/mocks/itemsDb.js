const itemsDb = {
  "items": {
    "byId": {
      "1": {
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
        "deposit": {
          "amount": 40,
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
      },
      "2": {
        "id": 2,
        "status": "DRAFT",
        "name": "Spanner",
        "description": "For tightening things",
        "tags": [
          3
        ],
        "pricePerHire": {
          "amount": 8,
          "currency": "GBP"
        },
        "pricePerDay": {
          "amount": 3,
          "currency": "GBP"
        },
        "deposit": {
          "amount": 43,
          "currency": "GBP"
        },
        //I have used the "location" part of a google geocoding location return here
        "geolocation": {
          "lat": 45.4224764,
          "lng": -110.0842499
        },
        "bookings": [
          1
        ]
      },
      "3": {
        "id": 3,
        "status": "DISABLED",
        "name": "Vice",
        "description": "For securing things",
        "tags": [
          3
        ],
        "pricePerHire": {
          "amount": 15,
          "currency": "GBP"
        },
        "pricePerDay": {
          "amount": 19,
          "currency": "GBP"
        },
        "deposit": {
          "amount": 45,
          "currency": "GBP"
        },
        //I have used the "location" part of a google geocoding location return here
        "geolocation": {
          "lat": 10.4224764,
          "lng": -111.0842499
        },
        "bookings": [
          2
        ]
      }
    },
    "allIds": [1, 2, 3],
  },
  "tags": {
    "byId": {
      "1": { "id": 1, "name": "hammer", "numberOfUses": 1 },
      "2": { "id": 2, "name": "building", "numberOfUses": 1 },
      "3": { "id": 3, "name": "metalwork", "numberOfUses": 2 }
    },
    "allIds": [1, 2, 3],
  },
  "bookings": {
    "byId": {
      "1": {
        "id": 1,
        "status": "APPROVED",
        "item": 2,
        "user": "gridley123@hotmail.com",
        "start": "2018-01-25T00:00:00.000Z",
        "end": "2018-01-26T00:00:00.000Z",
        "totalPrice": {
          "amount": 11,
          "currency": "GBP"
        }
      },
      "2": {
        "id": 2,
        "status": "PENDING",
        "item": 3,
        "user": "tomedge3@hotmail.com",
        "start": "2018-01-27T00:00:00.000Z",
        "end": "2018-01-29T00:00:00.000Z",
        "totalPrice": {
          "amount": 53,
          "currency": "GBP"
        }
      },
      "3": {
        "id": 3,
        "status": "CANCELLED",
        "item": 1,
        "user": "dave@hotmail.com",
        "start": "2018-02-13T00:00:00.000Z",
        "end": "2018-02-20T00:00:00.000Z",
        "totalPrice": {
          "amount": 45,
          "currency": "GBP"
        }
      }
    },
    "allIds": [1, 2, 3],
  }
};

export default itemsDb;