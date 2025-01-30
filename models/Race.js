import { Schema, model } from 'mongoose'
const raceSchema = new Schema({
	title: { type: String, unique: true, required: true },
	text: { type: String, required: true },
	image: { type: String, required: true },
})
const Race = model('Race', raceSchema)
export default Race
