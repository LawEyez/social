import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    img: {
        type: String,
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Users', UserSchema)