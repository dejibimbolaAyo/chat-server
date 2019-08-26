const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);
const crypt = require("../helper/crypt");

var Schema = mongoose.Schema;
const contactSchema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
    contact: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

contactSchema.virtual('id').get(function () {
    return this._id;
});

contactSchema.set('toJSON', {
    virtuals: true
});
contactSchema.set('toObject', {
    virtuals: true
});

contactSchema.post("create", (next) => {
    next()
})

module.exports = mongoose.model('Contact', contactSchema, 'contacts');