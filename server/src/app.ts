import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'TypeScript server is running' })
})

export default app
