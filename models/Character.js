import { Schema, model } from 'mongoose'
const characterSchema = new Schema({
	name: { type: String, unique: true, required: true },
	text: { type: String, required: true },
	image: { type: String, required: true },
	race: { type: String, required: true },
})
const Character = model('Character', characterSchema)
export default Character
