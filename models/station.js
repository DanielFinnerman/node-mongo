import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const stationSchema = Schema({
    Location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    PostCode: String,
});

export default mongoose.model('Station', stationSchema);