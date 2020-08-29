import validator from 'validator'
import { _isEmpty } from '../helpers/index.mjs'

const { isEmpty } = validator

export default data => {
    let errors = {}

    data.school = !_isEmpty(data.school) ? data.school : ''
    data.degree = !_isEmpty(data.degree) ? data.degree : ''
    data.field = !_isEmpty(data.field) ? data.field : ''
    data.from = !_isEmpty(data.from) ? data.from : ''

    if (isEmpty(data.school)) {
        errors.school = 'School name is required!'
    }

    if (isEmpty(data.degree)) {
        errors.degree = 'Degree name is required!'
    }

    if (isEmpty(data.field)) {
        errors.field = 'Field of study is required!'
    }

    if (isEmpty(data.from)) {
        errors.from = 'From date is required!'
    }

    return {
        errors,
        isValid: _isEmpty(errors)
    }
}