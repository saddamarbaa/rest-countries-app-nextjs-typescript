import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
