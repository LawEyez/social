import express from 'express'
import * as handler from '../handlers/profilesHandler.mjs'
import { ensureAuthenticated } from '../helpers/index.mjs'
import profileValidator from '../validation/profile.mjs'
import experienceValidator from '../validation/experience.mjs'
import educationValidator from '../validation/education.mjs'

const router = express.Router()


/**
 * GET: profile
 */
router.get('/', ensureAuthenticated, async (req, res, next) => {
    try {
        const errors = {}
        const profile = await handler.findByUser(req.user.id)

        if (profile) {
            res.status(200).json({ profile })

        } else {
            errors.noprofile = 'Profile does not exist!'
            res.status(404).json({ errors })
        }
        
    } catch (err) {
        next(err)
    }
})


/**
 * POST: profile
 */
router.post('/', ensureAuthenticated, async (req, res, next) => {
    try {
        const { errors, isValid } = profileValidator(req.body)

        if (!isValid) {
            res.status(400).json({ errors })
        }

        const profileFields = {}

        profileFields.user = req.user.id

        // String fields
        if (req.body.handle) profileFields.handle = req.body.handle
        if (req.body.company) profileFields.company = req.body.company
        if (req.body.website) profileFields.website = req.body.website
        if (req.body.location) profileFields.location = req.body.location
        if (req.body.status) profileFields.status = req.body.status
        if (req.body.bio) profileFields.bio = req.body.bio

        // Skills array field
        if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',')

        // Social links fields
        profileFields.social = {}

        if (req.body.youtube) profileFields.social.youtube = req.body.youtube
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
       
        const profile = await handler.findByUser(req.user.id)

        if (profile) {
            // Update
            const updatedProfile = await handler.update(req.user.id, profileFields)
            res.status(200).json({ profile: updatedProfile })

        } else {
            // Confirm unique handle
            const unique = await handler.isUniqueHandle(profileFields.handle)

            if (!unique) {
                errors.handle = 'Handle is already in use!'
                res.status(400).json({ errors })
            }

            const newProfile = await handler.create(profileFields)
            res.status(200).json({ profile: newProfile })            
        }
        

    } catch (err) {
        next(err)
    }
})


/**
 * GET: profile by handle
 */
router.get('/handle/:handle', ensureAuthenticated, async (req, res, next) => {
    try {
        const errors = {}
        const handle =  req.params.handle
        const profile = await handler.findByHandle(handle)

        if (!profile) {
            errors.profile = "Profile does not exist!"
            res.status(404).json({ errors })
        }

        res.status(200).json({ profile })
        
    } catch (err) {
        next(err)
    }
})


/**
 * GET: profile by user
 */
router.get('/user/:userId', ensureAuthenticated, async (req, res, next) => {
    try {
        const errors = {}
        const userId =  req.params.userId
        const profile = await handler.findByUser(userId)

        if (!profile) {
            errors.profile = "Profile does not exist!"
            res.status(404).json({ errors })
        }

        res.status(200).json({ profile })

    } catch (err) {
        next(err)
    }
})


/**
 * GET: all profiles
 */
router.get('/all', async (req, res, next) => {
    try {
        const errors = {}
        const profiles = await handler.getAll()

        if (!profiles) {
            errors.profiles = 'No profiles available to show!'
            res.status(404).json({ errors })
        }

        res.status(200).json({ profiles })
        
    } catch (err) {
        next(err)
    }
})


/**
 * POST: add experience
 */
router.post('/experience', ensureAuthenticated, async (req, res, next) => {
    try {
        const { errors, isValid } = experienceValidator(req.body)

        if (!isValid) {
            res.status(400).json({ errors })
        }

        const profile = await handler.findByUser(req.user.id)

        if (!profile) {
            errors.profile = 'Profile does not exist!'
            res.status(404).json({ errors })
        }

        profile.education.unshift(req.body)

        const updatedProfile = await handler.update(req.user.id, profile)

        res.status(200).json({ updatedProfile })
        
    } catch (err) {
        next(err)
    }
})


/**
 * POST: add education
 */
router.post('/education', ensureAuthenticated, async (req, res, next) => {
    try {
        const { errors, isValid } = educationValidator(req.body)

        if (!isValid) {
            res.status(400).json({ errors })
        }
        
        const profile = await handler.findByUser(req.user.id)

        if (!profile) {
            errors.profile = 'Profile does not exist!'
            res.status(404).json({ errors })
        }

        profile.education.unshift(req.body)

        const updatedProfile = await handler.update(req.user.id, profile)

        res.status(200).json({ updatedProfile })
        
    } catch (err) {
        next(err)
    }
})


/**
 * GET: delete education
 */
router.get('/delete-education/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const profile = await handler.findByUser(req.user.id)

        const education = profile.education.filter(ed => {
            return ed.id != req.params.id
        })

        const updatedProfile = await handler.update(req.user.id, { education })

        res.status(200).json({ updatedProfile })

    } catch (err) {
        next(err)
    }
})

export default router