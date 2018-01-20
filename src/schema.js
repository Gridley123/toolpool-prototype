export const typeDefs =  `



enum STATUS {
    PUBLISHED,
    DRAFT,
    DISABLED
}

input UpdateLocationInput {
    ids: [ID!]
    geolocation: String
}

input UpdateStatusInput {
    ids: [ID!]
    status: STATUS
}

input ItemInput {
    id: ID!
    status: STATUS,
    name: String,
    description: String,
    tags: [String],
    pricePerDay: Float,
    geolocation: String
}

input ItemQuery {
    geolocation: String!,
    queryText: String
}

input BookingRequestInput {
    item: ID!,
    start: Date!,
    end: Date!
}

type Price {
  amount: Float!
  currency: String!
}

type Booking {
    id: ID!,
    item: ID!,
    user: ID!
    start: Date!,
    end: Date!
    totalPrice: Price!
}

type Availability {
    start: Date!,
    end: Date!,
    bookings: [Booking]
}

scalar Date

type Item {
    id: ID!
    status: STATUS,
    name: String,
    description: String,
    tags: [String],
    pricePerHire: Price,
    pricePerDay: Price,
    geolocation: String,
    bookings: [Booking]
}

type Query {
    list: [Item],
    get (id: ID!): Item,
    getAvailability (items: [ID!], start: Date!, end: Date! ): String
}

type Mutation {
    create (item: ItemInput!): Item,
    update (id: ID!, item: ItemInput): Item,
    requestBooking (booking: BookingRequestInput): Booking
    setStatus (ids: [ID!], status: STATUS): Item,
    updateLocation(ids: [ID!], geolocation: String): Item
}
`;
