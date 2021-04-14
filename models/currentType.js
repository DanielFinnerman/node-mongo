import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const currenTypeSchema = Schema({
    Description: String,
    Title: String,
});

export default mongoose.model('CurrentType', currenTypeSchema);
