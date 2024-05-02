import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userController from './controllers/user.js'
import authController from './controllers/auth.js'

dotenv.config({ path: ['.env'] })

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(userController)
app.use(authController)

app.listen(port, () => {
    console.info(`ouvindo a porta ${port}`)
})