import CurrentType from '../models/currentType.js';

export default {
    Connection: {
        CurrentTypeID(parent) {
            return CurrentType.findById(parent.CurrentTypeID);
        },
    },
    Query: {
        currenttypes: () => {
            return CurrentType.find();
        },
    },
};