import userSchema from './userSchema.js';
import levelSchema from './levelSchema.js';
import currentTypeSchema from './currentTypeSchema.js';
import connectionTypeSchema from './connectionTypeSchema.js';
import connectionSchema from './connectionSchema.js';
import stationSchema from './stationSchema.js';

import pkg from 'apollo-server-express';
const {gql} = pkg;

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
    linkSchema,
    userSchema,
    levelSchema,
    currentTypeSchema,
    connectionTypeSchema,
    connectionSchema,
    stationSchema,
];