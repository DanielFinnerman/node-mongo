import User from '../models/user.js';

export default {
    Query: {
        users: (parent, args) => {
            return User.find();
        },
        user: (parent, args) => {
            return User.findById(args.id);
        },
    },
};