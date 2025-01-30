import cookieParser from 'cookie-parser'
import express from 'express'
import connectDB from './config/db.js'
import cors from './middleware/corsConfig.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import userRouter from './routes/authRoutes.js'
import characterRoutes from './routes/characterRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import raceRoutes from './routes/raceRoutes.js'

const app = express()

connectDB()

app.use(cors)
app.use(express.json())
app.use(cookieParser())

app.use('/races', raceRoutes)
app.use('/games', gameRoutes)
app.use('/auth', userRouter)
app.use('/characters', characterRoutes)
app.use(errorMiddleware)
app.get('/', (_req, res) => {
	res.send('API is running...')
})

export default app
