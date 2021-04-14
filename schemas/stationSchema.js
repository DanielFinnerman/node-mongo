import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  scalar Coordinates
  extend type Query {
    stations(start: Int = 0, limit: Int = 10, bounds: BoundaryInput): [Station]
    station(id: ID!): Station
  }

  extend type Mutation {
    addStation(
      Connections: [ConnectionInput]
      Postcode: String
      Title: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
      Location: LocationInput!
    ): Station

    deleteStation(id: ID!): Station

    modifyStation(
      id: ID!
      Connections: [ConnectionInput]
      Postcode: String
      Title: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
    ): Station
  }

  input PointInput {
    lat: Float!
    lng: Float!
  }

  input BoundaryInput {
    _southWest: PointInput
    _northEast: PointInput
  }

  type Location {
    type: String!
    coordinates: [String]
  }

  type Station {
    id: ID!
    Location: Location!
    Connections: [Connection]!
    Title: String
    AddressLine1: String
    Town: String
    StateOrProvince: String
    Postcode: String
  }

  input LocationInput {
    coordinates: [Float!]!
  }

  input ConnectionInput {
    id: ID
    ConnectionTypeID: ID
    CurrentTypeID: ID
    LevelID: ID
    Quantity: Int
  }
`;