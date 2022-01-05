const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.lenght}`;
    });

const Thought = model('course', thoughtSchema);

module.exports = Thought;
