'use client'

import * as React from 'react'
import MapBox, { Marker } from 'react-map-gl/mapbox'
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css'

type ViewportProps = {
	latitude: number
	longitude: number
	zoom: number
}

type MapProps = {
	latitude: number
	longitude: number
	showPopup?: boolean
	markerColor?: string
	className?: string
}

export default function Mamp({ latitude, longitude }: MapProps) {
	const [viewport, setViewport] = React.useState<ViewportProps>({
		latitude,
		longitude,
		zoom: 13,
	})

	React.useEffect(() => {
		setViewport((prev) => ({
			...prev,
			latitude,
			longitude,
		}))
	}, [latitude, longitude])

	return (
		<div className="relative h-[600px] w-full sm:h-[800px]">
			<MapBox
				initialViewState={viewport}
				style={{ width: '100%', height: '100%' }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxAccessToken={
					'pk.eyJ1Ijoic2FkZGFtcyIsImEiOiJja3VmZ3o5a3AxdWJhMnVvMW91bTdieW53In0.aHyMyQahu3VeA6oXZR9plg'
				}>
				<Marker
					longitude={viewport.longitude}
					latitude={viewport.latitude}
					color="red"
				/>
			</MapBox>
		</div>
	)
}
