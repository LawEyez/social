import mongoose from 'mongoose'

// Connect to Database
export const connectToDatabase = async () => {
    const connection = mongoose.connect(settings.URI, { useNewUrlParser: true, useUnifiedTopology: true })

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