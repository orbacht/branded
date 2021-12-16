const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/members')
    .then(() => {
        console.log('Connection open!')
    })
    .catch(err => {
        console.log('Error!');
        console.log(err);
    })

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isvalid: {
        type: Boolean,
    },
    uniquestring: {
        type: String,
    }
})


const Member = mongoose.model('Member', memberSchema);




module.exports = {
    Member,
}


