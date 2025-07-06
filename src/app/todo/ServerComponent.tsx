import React from 'react'
import fs from 'fs'
export default function ServerComponent() {
	console.log(fs.readFileSync)
	return <div>ServerComponent</div>
}
