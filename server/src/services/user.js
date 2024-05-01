import bcrypt from 'bcrypt'
import User from '../models/user.js'

async function getAllUsers() {
    return await User.findAll()
}

async function getUserById(id) {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('Usuário não existe')
    }
    return user
}

async function getUserByUsername(username) {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error('Usuário não existe')
    }
    return user
}

async function hashPassword(passwd) {
    const salt = 10
    return new Promise((resolve, reject) => {
        bcrypt.hash(passwd, salt, async (err, hash) => {
            if (err) {
                reject('Não foi possível hashear senha!')
            }
            resolve(hash)
        })
    })
}

async function createUser(body) {
    const _body = body
    try {
        _body.password = await hashPassword(_body.password)
        return await User.create(_body)
    } catch (err) {
        throw new Error('Não foi possível criar usuário!')
    }
}

async function matchPasswd(password, hashed) {
    return await bcrypt.compare(password, hashed)
}

async function deleteUser(id) {
    const user = await getUserById(id)
    try {
        user.destroy()
        return "Usuário deletado com sucesso!"
    } catch (err) {
        throw new Error(`Não foi possível deletar usuário.`)
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    matchPasswd,
    deleteUser,
}