const { Schema, model, SchemaTypes } = require('mongoose');

// user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: SchemaTypes.ObjectId,
        ref: "User"
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
})

const User = model('User', userSchema);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

module.exports = User;