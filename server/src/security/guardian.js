import jwt from './jwt.js'

function reject(res) {
    res.status(401).send("Você não tem autorização para isso!")
}

function guard(req, cb) {
    const token = req.get("Authorization")
    if (!token) {
        return false
    }
    try {
        const decode = jwt.jwtDecode(token.replace("Bearer ", ""))
        return Boolean(cb(decode.profile))
    } catch (err) {
        return false
    }
}

export default {
    guard,
    reject
}