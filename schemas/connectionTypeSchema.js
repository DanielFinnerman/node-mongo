import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  type ConnectionType {
    id: ID
    FormalName: String
    Title: String
  }

  extend type Query {
    connectiontypes: [ConnectionType]
  }

  extend type Mutation {
    addConnectionType(FormalName: String, Title: String): ConnectionType
  }
`;