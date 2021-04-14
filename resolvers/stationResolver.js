import Station from '../models/station.js';
import Connection from '../models/connection.js';
import pkg from 'apollo-server-express';
const {AuthenticationError} = pkg;

import rectangleBounds from '../utils/rectangleBound.js';
// const { rectangleBounds } = require('../utils/rectangleBound');

export default {
    Query: {
        stations: (parent, {start, limit, bounds}) => {
            if (bounds) {
                let recBound = rectangleBounds(bounds._southWest, bounds._northEast);
                return Station.find()
                    .skip(start)
                    .limit(limit)
                    .where('Location')
                    .within(recBound);
            }
            return Station.find().skip(start).limit(limit);
        },
        station: (parent, args) => {
            return Station.findById(args.id);
        },
    },
    Mutation: {
        addStation: async (parent, args, contex) => {
            if (!context.user) {
                throw new AuthenticationError('authication failed');
            }
            return await Station.create({
                ...args,
                Location: {
                    type: 'Point',
                    coordinates: args.Location.coordinates,
                },
                Connections: await Promise.all(
                    args.Connections.map((element) =>
                        Connection.create({...element, id: undefined})
                    )
                ),
            });
        },
        deleteStation: async (parent, {id}) => {
            if (!context.user) {
                throw new AuthenticationError('authication failed');
            }
            return await Station.findByIdAndDelete(id);
        },

        modifyStation: async (parent, args) => {
            if (!context.user) {
                throw new AuthenticationError('authication failed');
            }
            return await Station.findByIdAndUpdate(
                args.id,
                {
                    ...args,
                    Connections: await Promise.all(
                        args.Connections.map(async (element) => {
                            return await Connection.findByIdAndUpdate(element.id, {
                                ...element,
                            });
                        })
                    ),
                },
                {new: true}
            );
        },
    },
};