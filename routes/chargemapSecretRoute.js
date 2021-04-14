import express from 'express';

const router = express.Router();
import Connection from '../models/connection.js';
import Station from '../models/station.js';
// const { Connection, Station } = require('../models/model');
import rectangleBounds from '../utils/rectangleBound.js';

router
    .route('/station')
    // create new Station
    .post(async (req, res) => {
        const connections = req.body.Connections;
        let connectionIds = [];
        for (const connection of connections) {
            const newConnection = await Connection.create(connection);
            connectionIds.push(newConnection._id);
        }

        let newStation = {
            ...req.body.Station,
            Connections: connectionIds,
        };

        const post = await Station.create(newStation);
        res.status(200).send(post);
    });

router.route('/station/:id').put(async (req, res) => {
    try {
        const connections = req.body.Connections;

        let connectionIds = [];
        for (const connection of connections) {
            const updateConnection = await Connection.findByIdAndUpdate(
                connection._id,
                connection,
                {
                    new: true,
                }
            );
            connectionIds.push(updateConnection._id);
        }

        const updateStation = {
            ...req.body.Station,
            Connections: connectionIds,
        };
        const station = await Station.findByIdAndUpdate(
            req.params.id,
            updateStation,
            {
                new: true,
            }
        );
        res.status(200).send(station);
    } catch (err) {
        res.status(404);
        res.send({error: err});
    }
});

export {router as chargemapSecretRoute};