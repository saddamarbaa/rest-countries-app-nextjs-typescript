import { NextRequest } from 'next/server'

export const dynamic = 'force-static'

// revalidate every 10 second
export const revalidate = 10

export async function GET(request: NextRequest) {
	console.log(request)
	console.log(request.headers)
	const response = await fetch(`https://restcountries.com/v3.1/all`)
	const data = await response.json()

	return Response.json(data)
}
