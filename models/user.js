const { Schema, model } = require('mongoose');
//const assignmentSchema = require('./Assignment');
// const thoughtSchema = require('./thought');

// Schema to create User
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        email: {
            type: String,
            maxLength: 50,
            lowercase: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            required: [true, "Email required"]
        },
        thoughtsId: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        },],
        friendsId: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friends')
    .get(function () {
        return `${this.friendsId.lenght} 111`;
    });

const User = model('user', userSchema);

module.exports = User;
