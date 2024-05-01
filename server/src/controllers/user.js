import userService from '../services/user.js'
import { Router } from 'express'

const router = Router()

router.get('/users', async (_, res) => {
    res.status(200).send(await userService.getAllUsers())
})

router.put('/users', async (req, res) => {
    try {
        res.status(200).send(await userService.createUser(req.body))
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        res.status(200).send(await userService.deleteUser(req.params.id))
    } catch (err) {
        res.status(400).send(err.message)
    }
})

export default router