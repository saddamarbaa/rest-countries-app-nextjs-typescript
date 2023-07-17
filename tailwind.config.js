/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				customBlack: {
					50: '#F5F8FA',
					100: '#EBF2F5',
					200: '#DDE8ED',
					300: '#C9D9E1',
					400: '#AEBCC5',
					500: '#8F9EA7',
					600: '#6F7E87',
					700: '#4F5D66',
					800: '#2F3D46',
					900: '#212E37',
				},
				customWhite: {
					50: '#FAFAFA',
					100: '#F1F1F1',
					200: '#E8E8E8',
					300: '#DCDCDC',
					400: '#CECECE',
					500: '#BEBEBE',
					600: '#ACACAC',
					700: '#979797',
					800: '#7D7D7D',
					900: '#FFFFFF',
				},
				twitterBlack: '#14171A',
				twitterWhite: '#F5F8FA',
			},
			screens: {
				ss: '300px',
				xs: '320px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},
		maxWidth: ({ theme, breakpoints }) => ({
			none: 'none',
			0: '0rem',
			ss: '19rem',
			xs: '20rem',
			sm: '24rem',
			md: '28rem',
			lg: '32rem',
			xl: '36rem',
			'2xl': '42rem',
			'3xl': '48rem',
			'4xl': '56rem',
			'5xl': '64rem',
			'6xl': '72rem',
			'7xl': '80rem',
			'8xl': '90rem',
			'9xl': '95rem',
			'10xl': '100rem',
			full: '100%',
			min: 'min-content',
			max: 'max-content',
			fit: 'fit-content',
			prose: '65ch',
			...breakpoints(theme('screens')),
		}),
	},
	variants: {
		lineClamp: ['responsive'],
	},
	plugins: [],
	mode: 'jit',
	darkMode: 'class',
}




