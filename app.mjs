import express from 'express'
import passport from 'passport'
import { normalizePort, connectToDatabase } from './helpers/index.mjs'
import { passportSetup } from './handlers/usersHandler.mjs'
import posts from './routes/posts.mjs'
import profiles from './routes/profiles.mjs'
import users from './routes/users.mjs'

const app = express()
const port = normalizePort(process.env.PORT || 5000)

// DB connection
connectToDatabase()

//  Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Passport middleware
app.use(passport.initialize())
passportSetup(passport)

// Routes
app.use('/posts', posts)
app.use('/profile', profiles)
app.use('/users', users)

// Listen to port
app.listen(port, () => console.log(`Server live on port ${port}...`))