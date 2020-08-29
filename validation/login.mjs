import validator from 'validator'
import { _isEmpty } from '../helpers/index.mjs'

const { isEmail, isEmpty } = validator

export default data => {
    let errors = {}

    data.email = !_isEmpty(data.email) ? data.email : ''
    data.password = !_isEmpty(data.password) ? data.password : ''

    if (!isEmail(data.email)) {
        errors.email = "Invalid email address!"
    }

    if (isEmpty(data.email)) {
        errors.email = "Email address is required!"
    }

    if (isEmpty(data.password)) {
        errors.password = "Password must be provided!"
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    }
} 