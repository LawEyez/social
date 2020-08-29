import validator from 'validator'
import { _isEmpty } from '../helpers/index.mjs'

const { isEmpty, isLength, isURL } = validator

export default data => {
    let errors = {}

    data.handle = !_isEmpty(data.handle) ? data.handle : ''
    data.status = !_isEmpty(data.status) ? data.status : ''
    data.skills = !_isEmpty(data.skills) ? data.skills : ''

    if (!isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = 'Handle needs to be betweeen 2 and 30 characters!'
    }

    if (isEmpty(data.handle)) {
        errors.handle = 'Handle is required!'
    }

    if (isEmpty(data.status)) {
        errors.status = 'Your status is required!'
    }

    if (isEmpty(data.skills)) {
        errors.skills = 'You must provide your skills!'
    }

    if (!_isEmpty(data.website)) {
        if (!isURL(data.website)) {
            errors.website = 'Website URL is invalid!'
        }
    }

    if (!_isEmpty(data.website)) {
        if (!isURL(data.website)) {
            errors.website = 'Website URL is invalid!'
        }
    }

    if (!_isEmpty(data.youtube)) {
        if (!isURL(data.youtube)) {
            errors.youtube = 'Youtube URL is invalid!'
        }
    }

    if (!_isEmpty(data.twitter)) {
        if (!isURL(data.twitter)) {
            errors.twitter = 'Twitter URL is invalid!'
        }
    }

    if (!_isEmpty(data.facebook)) {
        if (!isURL(data.facebook)) {
            errors.facebook = 'Facebook URL is invalid!'
        }
    }

    if (!_isEmpty(data.instagram)) {
        if (!isURL(data.instagram)) {
            errors.instagram = 'Instagram URL is invalid!'
        }
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    }
}