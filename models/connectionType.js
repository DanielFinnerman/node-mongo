import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const connectionTypeSchema = Schema({
    FormalName: String,
    Title: String,
});

export default mongoose.model('ConnectionType', connectionTypeSchema);
