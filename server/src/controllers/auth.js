import jwt from '../security/jwt.js'
import userService from '../services/user.js'
import { Router } from 'express'

const router = Router()

router.post('/auth/login', async (req, res) => {
    const body = req.body
    try {
        const user = await userService.getUserByUsername(body.username)
        const match = await userService.matchPasswd(body.password, user.password)

        if (!match) {
            res.status(401).send('Credenciais incorretas!')
            return
        }

        const payload = {
            id: user.id,
            username: user.username,
            profile: user.profile
        }

        const token = jwt.jwtEncode(payload)
        
        res.status(200).send({ token, payload })
    } catch (err) {
        res.status(401).send('Credenciais incorretas!')
    }
})

router.post('/auth/verify', (req, res) => {
    const body = req.body
    try {
        res.status(200).send(jwt.jwtDecode(body.token))
    } catch (err) {
        res.status(401).send(err.message)
    }
})

export default router