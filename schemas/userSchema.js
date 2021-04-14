import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID
    username: String
    password: String
    fullname: String
  }

  # extend type Mutation {
  #   addUser(username: String, password: String, fullname: String): User
  #   # modifyAnimal(id: ID!, animalName: String, species: ID): Animal
  # }
`;