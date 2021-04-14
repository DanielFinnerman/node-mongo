import Connection from '../models/connection.js';

export default {
    Station: {
        Connections(parent) {
            return parent.Connections.map((id) => Connection.findById(id));
        },
    },
};