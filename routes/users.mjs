import express from 'express'
import jwt from 'jsonwebtoken'
import  * as handler from '../handlers/usersHandler.mjs'
import { settings, ensureAuthenticated } from '../helpers/index.mjs'
import signupValidator from '../validation/signup.mjs'
import loginValidator from '../validation/login.mjs'

const router = express.Router()


/**
 * GET: Signup
 */
router.get('/signup', async (req, res, next) => {
    try {
        res.status(200).json({ msg: 'This is the sign up page!' })

    } catch (err) {
        res.status(500).json({ err })
    }
})


/**
 * POST: Signup
 */
router.post('/signup', async (req, res, next) => {
    try {
        const { fname, lname, email, password, passwordConf } = req.body
        const { errors, isValid } = signupValidator(req.body)

        if (isValid) {
            const user = await handler.find(email)

            if (!user) {
                if (password === passwordConf) {
                    const newUser = await handler.create(fname, lname, email, password)
    
                    res.status(200).json({ msg: 'Signup success!', newUser})
    
                } else {
                    errors.password = 'Passwords do not match!'
                    res.status(400).json({ errors })
                }
                
            } else {
                errors.email = 'Email already in use!'
                res.status(400).json({ errors })
            }
        } else {
            res.status(400).json({ errors })
        }
        

    } catch (err) {
        res.status(500).json({ err })
    }
})


/**
 * GET: Login
 */
router.get('/login', async (req, res, next) => {
    try {
        res.json({ msg: 'This is the login page!' })

    } catch (err) {
        next(err)
    }
})


/**
 * POST: Login
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { errors, isValid } = loginValidator(req.body)

        if (!isValid) {
            res.status(400).json({ errors })
        }

        const user = await handler.find(email)

        if (user) {
            const equal = handler.passwordEqual(password, user.password)

            if (equal) {
                const payload = {
                    id: user.id,
                    username: (typeof user.username !== 'undefined' ? user.username : user.fname),
                    email: user.email
                }

                const token = jwt.sign(payload, settings.secret)

                res.status(200).json({ msg: 'Login success!', token: `Bearer ${token}`})

            } else {
                errors.password = 'Incorrect password!'
                res.status(400).json({ errors })
            }

        } else {
            errors.email = 'User does not exist!'
            res.status(400).json({ errors  })
            
        }

    } catch (err) {
        next(err)
    }
})


/**
 * GET: protected
 */
router.get('/protected', ensureAuthenticated, (req, res) => {
    res.json(req.user)
})


export default router