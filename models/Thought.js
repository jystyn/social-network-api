const { Schema, model, SchemaTypes, Types } = require('mongoose');
const moment = require('moment');

// reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: SchemaTypes.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    }
});

// thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        requred: true,
        min: 1,
        max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

module.exports = Thought;