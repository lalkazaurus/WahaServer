import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '15m',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await Token.create({ user: userId, refreshToken })

		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await Token.deleteOne({ refreshToken })
		return tokenData
	}

	async findToken(refreshToken) {
		console.log('Received refreshToken:', refreshToken)
		console.log('Type of refreshToken:', typeof refreshToken)

		if (!refreshToken || typeof refreshToken !== 'string') {
			throw new Error('refreshToken must be a valid string')
		}

		return await Token.findOne({ refreshToken })
	}
}

export default new TokenService()
