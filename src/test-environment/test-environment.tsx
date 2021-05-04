import React from 'react'
import TestIcon from '@fortawesome/fontawesome-free/svgs/brands/accessible-icon.svg'
import './test-environment.scss'
import { MalleableComponent } from '../lib/malleable-component'
import { TextInput } from '../lib/text-input'
import { Checkbox } from '../lib/checkbox'

import components from './config.json'

MalleableComponent.registerComponent('string', () => new TextInput() )
MalleableComponent.registerComponent('boolean', () => new Checkbox() )

export function App() {
	const result = {}
	
	function changed( propName: string, value: unknown ) {
		result[ propName ] = value
	}

	return (
		<> 
			<h1 className="test-header">Hi there!</h1>
			<TestIcon width="1em"/>
			{
				Object.keys( components ).map( 
					entry => MalleableComponent.renderInstance( entry, components[entry], changed)
				)
			}
			<button 
				onClick={ ()=>console.log( result ) }
			>
				Results
			</button>
		</>
	)
}
