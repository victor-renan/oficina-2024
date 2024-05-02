import jwt from 'jsonwebtoken'

function jwtEncode(payload) {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    } catch (err) {
        console.log(err)
        throw new Error('Não foi possível codificar para JWT!')
    }
}

function jwtDecode(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        throw new Error('Token inválido!')
    }
}

export default {
    jwtEncode,
    jwtDecode
}