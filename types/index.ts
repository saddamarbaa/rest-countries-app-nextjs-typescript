export type CountryType = {
	name: {
		official: string
		nativeName?: {
			ara: {
				official: string
			}
		}
	}
	region: string
	population: number
	capital: string[]
	flags: {
		png: string
	}
	languages?: any
	currencies?: any
	subregion?: string
	borders?: string[]
}
