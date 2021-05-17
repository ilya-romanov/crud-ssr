const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    }
});

userSchema.pre('save', async function(next) {
    const user = this;

    /* hash password from register input */
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 12);

    /* set approved property to false */
    user.approved = false;

    next();
})

const User = mongoose.connection.model("users", userSchema);

const createOne = async (email, password, approved) =>
    await new User({ email, password, approved}).save();

const readOne = async (email) => await User.findOne({ email });

const readAll = async () => await User.find({});

module.exports = {
    createOne,
    readOne,
    readAll
};
