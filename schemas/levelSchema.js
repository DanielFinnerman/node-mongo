import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  type Level {
    id: ID
    Comments: String
    IsFastChargeCapable: Boolean
    Title: String
  }

  extend type Query {
    leveltypes: [Level]
  }

  extend type Mutation {
    addLevel(
      Comment: String
      IsFastChargeCapable: Boolean
      Title: String
    ): Level
  }
`;