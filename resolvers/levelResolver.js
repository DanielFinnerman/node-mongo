import Level from '../models/level.js';

export default {
    Query: {
        leveltypes: () => {
            return Level.find();
        },
    },
    Connection: {
        LevelID(parent) {
            return Level.findById(parent.LevelID);
        },
    },
};