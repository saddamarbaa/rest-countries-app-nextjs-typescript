import { NextRequest } from 'next/server'

// Either use force-static OR revalidate, not both
// Option 1: Fully static (no revalidation)
// export const dynamic = 'force-static'

// Option 2: ISR with revalidation
export const revalidate = 10

export async function GET(request: NextRequest) {
	// Don't log the entire request object, just what you need
	console.log({
		url: request.url,
		method: request.method,
		// headers: Object.fromEntries(request.headers.entries())
	})

	const response = await fetch(`https://restcountries.com/v3.1/all`)
	const data = await response.json()

	return Response.json(data)
}
