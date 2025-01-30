import cors from 'cors'
const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 204,
}
export default cors(corsOptions)
