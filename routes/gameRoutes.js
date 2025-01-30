import { Router } from 'express'
import Game from '../models/Game.js'

const gameRoutes = Router()

gameRoutes.get('/', async (_req, res) => {
	try {
		const games = await Game.find()
		res.json(games)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

gameRoutes.post('/', async (req, res) => {
	try {
		const { title, text, image } = req.body

		if (!title || !text || !image) {
			return res
				.status(400)
				.json({ error: 'All fields are required: title, text, image' })
		}

		const existingGame = await Game.findOne({ title })
		if (existingGame) {
			return res
				.status(400)
				.json({ error: 'A game with this title already exists' })
		}

		const newGame = new Game({ title, text, image })

		const savedGame = await newGame.save()

		res.status(201).json(savedGame)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

export default gameRoutes
