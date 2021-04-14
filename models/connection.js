import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const connectionSchema = Schema({
    ConnectionTypeID: {type: Schema.Types.ObjectId, ref: 'ConnectionType'},
    LevelID: {type: Schema.Types.ObjectId, ref: 'Level'},
    CurrentTypeID: {type: Schema.Types.ObjectId, ref: 'CurrentType'},
    Quantity: Number,
});

export default mongoose.model('Connection', connectionSchema);
