import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
import User from '../models/User.js'
import mailService from './mailService.js'
import tokenService from './tokenService.js'

class UserService {
	async registration(email, password) {
		const candidate = await User.findOne({ email })

		if (candidate)
			throw ApiError.BadRequest('A user with this email already exists.')

		const hashPassword = await bcrypt.hash(password, 3)
		const activationLink = uuidv4()

		const user = await User.create({
			email,
			password: hashPassword,
			activationLink,
		})

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/auth/activate/` + activationLink
		)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async activate(activationLink) {
		const user = await User.findOne({ activationLink })
		if (!user) throw ApiError.BadRequest('This link is incorrect')
		user.isActivated = true
		await user.save()
	}

	async login(email, password) {
		const user = await User.findOne({ email })
		if (!user) throw ApiError.BadRequest('User with this e-mail was not found')
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) throw ApiError.BadRequest('Incorrect password')
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await User.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async getAllUsers() {
		const users = User.find()
		return users
	}
}

export default new UserService()
