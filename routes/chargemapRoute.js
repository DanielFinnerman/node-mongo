import express from 'express';

const router = express.Router();

import Station from '../models/station.js';
import Connection from '../models/connection.js';
import Level from '../models/level.js';
import ConnectionType from '../models/connectionType.js';
import CurrentType from '../models/currentType.js';

import rectangleBounds from '../utils/rectangleBound.js';

router
    .route('/station')

    .get(async (req, res) => {
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        if (req.query.topRight && req.query.bottomLeft) {
            let bound = rectangleBounds(
                JSON.parse(req.query.topRight),
                JSON.parse(req.query.bottomLeft)
            );
            res
                .status(200)
                .send(await Station.find().where('loc').within(bound).limit(limit));
        } else {

            res.status(200).send(await Station.find().limit(limit));
        }

    });

router
    .route('/station/:id')
    // get one station by id
    .get(async (req, res) => {
        res.send(
            await Station.findById(req.params.id).populate({
                path: 'Connections',
                model: Connection,
                populate: [
                    {
                        path: 'ConnectionTypeID',
                        model: ConnectionType,
                    },
                    {
                        path: 'LevelID',
                        model: Level,
                    },
                    {
                        path: 'CurrentTypeID',
                        model: CurrentType,
                    },
                ],
            })
        );
    })

    // delete station
    .delete(async (req, res) => {
        const stationId = req.params.id;
        try {
            const response = await Station.findByIdAndDelete(stationId);
            res.status(200).json({deleteItem: response});
        } catch (err) {
            res.status(404);
            res.json({error: err});
        }
    });

export {router as chargemapRoute};