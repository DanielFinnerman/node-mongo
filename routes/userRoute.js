'use strict';
import express from 'express';
const router = express.Router();
import User from '../models/user.js';

router.post('/', async (req, res) => {
    try {
        const doc = await User.create({...req.body});
        const result = doc.toJSON();
        res.json({...result, password: undefined});
    } catch (err) {
        res.send(err);
    }
});

export {router as userRoute};