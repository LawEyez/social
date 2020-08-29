import validator from 'validator'
import { _isEmpty } from '../helpers/index.mjs'

const { isLength, isEmail, equals, isEmpty } = validator

export default data => {
    let errors = {}

    data.fname = !_isEmpty(data.fname) ? data.fname : ''
    data.lname = !_isEmpty(data.lname) ? data.lname : ''
    data.email = !_isEmpty(data.email) ? data.email : ''
    data.password = !_isEmpty(data.password) ? data.password : ''
    data.passwordConf = !_isEmpty(data.passwordConf) ? data.passwordConf : ''

    if (!isLength(data.fname, { min: 2, max: 30 })) {
        errors.fname = 'First name should be between 2 and 30 characters!'
    }

    if (isEmpty(data.fname)) {
        errors.fname = 'First name is required!'
    }

    if (!isLength(data.lname, { min: 2, max: 30 })) {
        errors.lname = 'Last name should be between 2 and 30 characters!'
    }

    if (isEmpty(data.lname)) {
        errors.lname = 'Last name is required!'
    }

    if (!isEmail(data.email)) {
        errors.email = 'Invalid email address!'
    }

    if (isEmpty(data.email)) {
        errors.email = 'Email address is required!'
    }

    if (!isLength(data.password, { min: 5, max: 30 })) {
        errors.password = 'Password must be at least 5 characters long'
    }

    if (isEmpty(data.password)) {
        errors.password = 'Password must be provided!'
    }

    if (!equals(data.password, data.passwordConf)) {
        errors.passwordConf = 'Passwords do not match!'
    }

    if (isEmpty(data.passwordConf)) {
        errors.passwordConf = 'Password must be confirmed!'
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    }
}