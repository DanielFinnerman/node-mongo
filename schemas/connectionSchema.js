import pkg from 'apollo-server-express';
const {gql} = pkg;

export default gql`
  extend type Query {
    connections: [Connection]
  }

  type Connection {
    ConnectionTypeID: ConnectionType
    LevelID: Level
    CurrentTypeID: CurrentType
    Quantity: Int
  }

  extend type Mutation {
    addConnection(
      ConnectionTypeID: ID
      LevelID: ID
      CurrentTypeID: ID
      Quantity: Int
    ): Connection
    # modifyAnimal(id: ID!, animalName: String, species: ID): Animal
  }
`;