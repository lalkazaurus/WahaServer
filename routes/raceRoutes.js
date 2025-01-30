import { Router } from 'express'
import Race from '../models/Race.js'

const raceRoutes = Router()

raceRoutes.get('/', async (_req, res) => {
	try {
		const races = await Race.find()
		res.json(races)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

raceRoutes.post('/', async (req, res) => {
	try {
		const { title, text, image } = req.body

		console.log(req.body)

		if (!title || !text || !image) {
			return res.status(400).json({
				error: 'All fields are required: title, information, image',
			})
		}

		const existingRace = await Race.findOne({ title })
		if (existingRace) {
			return res
				.status(400)
				.json({ error: 'A race with this title already exists' })
		}

		const newRace = new Race({ title, text, image })

		const savedRace = await newRace.save()

		res.status(201).json(savedRace)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

raceRoutes.get('/:title', async (req, res) => {
	const { title } = req.params
	console.log(title)
	try {
		const race = await Race.findOne({ title: title })

		console.log(race)
		if (race) {
			res.json(race)
		} else {
			res.status(404).json({ error: 'Race not found' })
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

export default raceRoutes
