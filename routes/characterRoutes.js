import { Router } from 'express'
import Character from '../models/Character.js'

const characterRoutes = Router()

characterRoutes.post('/', async (req, res) => {
	const { title } = req.body

	if (!title) {
		return res.status(400).json({ error: 'Title is required' })
	}

	try {
		const characters = await Character.find({ race: title })

		if (characters.length > 0) {
			res.json(characters)
		} else {
			res.status(404).json({ error: 'No characters found for this race' })
		}
	} catch (err) {
		console.error('Error fetching characters:', err)
		res.status(500).json({ error: 'Server error' })
	}
})

characterRoutes.post('/add', async (req, res) => {
	try {
		const { name, text, image, race } = req.body

		console.log(req.body)

		if (!name || !text || !image || !race) {
			return res.status(400).json({
				error: 'All fields are required: name, information, image, race',
			})
		}

		const existingCharacter = await Character.findOne({ name })
		if (existingCharacter) {
			return res
				.status(400)
				.json({ error: 'A character with this name already exists' })
		}

		const newCharacter = new Character({ name, text, image, race })

		const savedCharacter = await newCharacter.save()

		res.status(201).json(savedCharacter)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message })
		} else {
			res.status(400).json({ error: 'An unknown error occurred' })
		}
	}
})

export default characterRoutes
