import React from 'react'
import ClientComponent from './ClientComponent'
import ServerComponent from './ServerComponent'

export default function Warper() {
	return (
		<div className="p-40 flex items-center justify-center ">
      <ClientComponent >
        <ServerComponent/>
        </ClientComponent>
		</div>
	)
}
