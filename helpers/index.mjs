import mongoose from 'mongoose'
import crypto from 'crypto'
import passport from 'passport'
import { type } from 'os'

// Connect to Database
export const connectToDatabase = async () => {
    const connection = mongoose.connect(settings.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    if (connection) {
        console.log('Database connected...')
    } else {
        console.log('Database connection failed!')
    }
}


// normalize port
export const normalizePort = (val) => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port > 0) {
        return port
    } 

    return false
}

// db Settings
export const settings = {
    URI: 'mongodb://localhost:27017/social',
    secret: "victoria's"
}

// Hasher
export const hash = str => {
    return crypto.createHmac('sha256', settings.secret).update(str).digest('hex')
}

// Protect route
export const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next)
}

// isEmpty
export const _isEmpty = val => {
    return (
        val === undefined ||
        val === null ||
        (typeof val == 'string' && val.trim().length == 0) ||
        (typeof val == 'object' && Object.keys(val).length == 0)
    )
}