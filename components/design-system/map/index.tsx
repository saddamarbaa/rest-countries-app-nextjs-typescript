'use client'

import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

type MapProps = {
	latitude: number
	longitude: number
	zoom: number
}

type PropsType = {
	latitude: number
	longitude: number
}

export function Map({ latitude, longitude }: PropsType) {
	return <div className="relative h-[600px] w-full sm:h-[800px]">map TOODO</div>
}

export default Map
