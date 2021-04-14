import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  type CurrentType {
    id: ID
    Description: String
    Title: String
  }

  extend type Query {
    currenttypes: [CurrentType]
  }
`;