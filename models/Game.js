import { Schema, model } from 'mongoose'
const gameSchema = new Schema({
	title: { type: String, unique: true, required: true },
	text: { type: String, required: true },
	image: { type: String, required: true },
})
const Game = model('Game', gameSchema)
export default Game
