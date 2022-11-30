export type CountryT = {
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
	capitalInfo: {
		latlng: [number, number]
	}
	maps: {
		googleMaps: string
		openStreetMaps: string
	}
}
