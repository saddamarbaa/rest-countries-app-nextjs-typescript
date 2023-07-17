import { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET,
	jwt: {
		encode: ({ secret, token }) => {
			const encodedToken = jsonwebtoken.sign(
				{
					...token,
					iss: 'grafbase',
					exp: Math.floor(Date.now() / 1000) + 60 * 60,
				},
				secret,
			)
			return encodedToken
		},
		decode: async ({ secret, token }) => {
			const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
			return decodedToken
		},
	},
	// theme: {
	// 	colorScheme: 'light',
	// 	logo: '/logo.png',
	// },
	callbacks: {
		async session({ session, token, user }) {
			const email = session?.user?.email as string
			try {
				// do any side effect including strong user to db

				const newSession = {
					...session,
				}

				return newSession
			} catch (error) {
				console.log('Error retrieving user data', error)
				return session
			}
		},
		async signIn({ user, account, profile, email, credentials }) {
			return true
		},
		async redirect({ url, baseUrl }) {
			return baseUrl
		},
	},
}
