/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			'flagcdn.com',
			'upload.wikimedia.org',
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'githubusercontent.com',
			'pbs.twimg.com',
			'media.licdn.com',
		],
	},
}

module.exports = nextConfig
