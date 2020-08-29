import passportJwt from 'passport-jwt'
import User from '../models/User.mjs'
import { hash, settings } from '../helpers/index.mjs'

// Create user
export const create = async (fname, lname, email, password) => {
    const newUser = new User ({
        fname, lname, email,
        password: hash(password)
    })

    await newUser.save()

    return newUser
}

// Fetch user
export const fetch = async id => {
    const user = await User.findById(id)
    return user
}

// Find user
export const find = async email => {
    const user = await User.findOne({ email })
    return user
}

// Update user
export const update = async (id, fname, lname, email, password, img) => {
    const user = await User.findById(id)

    user.fname = fname
    user.lname = lname
    user.email = email
    user.password = hash(password)
    
    if (typeof img !== 'undefined') {
        user.img = img
    }

    await user.save()

    return user
}

// Remove user
export const remove = async id => {
    await User.findByIdAndDelete(id)
}

// Confirm password
export const passwordEqual = (raw, hashed) => {
    if (hash(raw) === hashed) return true
    return false
}

// Passport JWT setup
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.secret
}

export const passportSetup = passport => {
    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await fetch(jwtPayload.id)

            if (user) {
                done(null, user)

            } else {
                done(null, false)
            }

        } catch (err) {
            done(err)
        }
    }))
}