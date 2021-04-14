import ConnectionType from '../models/connectionType.js';

export default {
    Connection: {
        ConnectionTypeID(parent) {
            return ConnectionType.findById(parent.ConnectionTypeID);
        },
    },
    Query: {
        connectiontypes: () => {
            return ConnectionType.find();
        },
    },
};