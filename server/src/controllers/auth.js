import authService from '../services/auth.js'
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
            username: user.username,
            profile: user.profile,
        }

        const token = authService.jwtEncode(payload)

        res.status(200).send({ token, payload, type: user.getProfileType() })
    } catch (err) {
        res.status(401).send('Credenciais incorretas!')
    }
})

router.post('/auth/verify', (req, res) => {
    const body = req.body
    try {
        res.status(200).send(authService.jwtDecode(body.token))
    } catch (err) {
        res.status(401).send(err.message)
    }
})

export default router