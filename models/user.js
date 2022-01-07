const { Schema, model } = require('mongoose');

// Schema to create User
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendsCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;
