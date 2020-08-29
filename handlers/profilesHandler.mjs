import Profile from '../models/Profile.mjs'

// Create profile
export const create = async data => {
    const profile = new Profile (data)

    await profile.save()

    return profile
}

// Find profile by id
export const findById = async id => {
    const profile = await Profile.findById(id).populate('user', ['fname', 'username', 'img'])
    return profile
}

// Find profile by user
export const findByUser = async user => {
    const profile = await Profile.findOne({ user }).populate('user', ['fname', 'username', 'img'])
    return profile
}

// Find profile by handle
export const findByHandle = async handle => {
    const profile = await Profile.findOne({ handle }).populate('user', ['fname', 'username', 'img'])
    return profile
}

// Update profile
export const update = async (id, data) => {
    const profile = await Profile.findOneAndUpdate({ user: id }, { $set: data }, { new: true }).populate('user', ['fname', 'username', 'img']) 

    return profile
}

// Remove profile
export const remove = async id => {
    await Profile.findOneAndDelete({ user: id })
}

// Get all profiles
export const getAll = async () => {
    const profiles = await Profile.find().populate('user', ['fname', 'username', 'img'])

    return profiles
}

// Delete education
export const deleteEducation = async (user, id) => {
    const profile = await Profile.findOne({ user })

    profile.education.filter(ed => {
        return ed.id !== id
    })

    await profile.save()

    return profile
}

// Unique handle
export const isUniqueHandle = async handle => {
    const profile = await Profile.findOne({ handle })

    if (profile) return false

    return true
}
