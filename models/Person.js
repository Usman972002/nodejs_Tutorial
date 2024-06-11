const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, address: {
        type: String,
    }, salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Pre Save
personSchema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

// Function To compare Password 
personSchema.methods.comparePassword = async function (typedPassword) {
    try {
        const isMatch = await bcrypt.compare(typedPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

// Create Person Model 
const person = mongoose.model('person', personSchema);
module.exports = person;