const name = '23'

const val = parseInt(name, 16)

// console.log(val)

import validator from 'validator'
import jwt from 'jsonwebtoken'

const isEmail = str => {
    if (str.length >= 5) {

        if (str.indexOf('@') > -1 && str.indexOf('.') > -1) return true

        return false
    }
    
    return false
}

let str = '1@22.pp'
const check = validator.isEmail(str)
const payload = { name: 'allen', email: 'a@b.c', password: '1234' }
const token = jwt.sign(payload, "victoria's")

const user = jwt.decode(token)

// console.log(token)
// console.log(user)

const _isEmpty = val => {
    return (
        val === undefined ||
        val === null ||
        (typeof val == 'string' && val.trim().length == 0) ||
        (typeof val == 'object' && Object.keys(val).length == 0)
    )
}

const obj = {...payload}

console.log(_isEmpty(payload))
console.log(obj)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jIiwiaWF0IjoxNTk4MjkzMzAyfQ.CUQ5HL_7Y_9Rzz-vCxjPXv0AQBvYR7ynOhO27S6UedQ