import validator from 'validator'
import { _isEmpty } from '../helpers/index.mjs'

const { isEmpty } = validator

export default data => {
    let errors = {}

    data.title = !_isEmpty(data.title) ? data.title : ''
    data.company = !_isEmpty(data.company) ? data.company : ''
    data.from = !_isEmpty(data.from) ? data.from : ''

    if (isEmpty(data.title)) {
        errors.title = 'Job title is required!'
    }

    if (isEmpty(data.company)) {
        errors.company = 'Company name is required!'
    }

    if (isEmpty(data.from)) {
        errors.from = 'From date is required!'
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    }
}