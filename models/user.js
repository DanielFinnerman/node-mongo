import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRound = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    full_name: String,
});

userSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    try {
        if (!this.isModified('password')) return next();

        // generate a salt
        const salt = await bcrypt.genSalt(saltRound);
        // hash the password using our new salt
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('User', userSchema);