const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);
const crypt = require("../helper/crypt");

var Schema = mongoose.Schema;
const friendRequestSchema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        // Friend request initiator
    },
    friend: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        // Intended friend
    },
    status: {
        type: String
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

friendRequestSchema.virtual('id').get(function () {
    return this._id;
});

friendRequestSchema.set('toJSON', {
    virtuals: true
});
friendRequestSchema.set('toObject', {
    virtuals: true
});

friendRequestSchema.post("create", (next) => {
    next()
})

module.exports = mongoose.model('FriendRequest', friendRequestSchema, 'friendRequests');