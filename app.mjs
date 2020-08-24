import express from 'express'
import mongoose from 'mongoose'
import { normalizePort, connectToDatabase } from './helpers/index.mjs'

const app = express()
const port = normalizePort(process.env.PORT || 5000)

// DB connection
connectToDatabase()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Listen to port
app.listen(port, () => console.log(`Server live on port ${port}...`))