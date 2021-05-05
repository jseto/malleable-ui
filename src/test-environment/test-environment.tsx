import React from 'react'
import TestIcon from '@fortawesome/fontawesome-free/svgs/brands/accessible-icon.svg'
import './test-environment.scss'
import { Malleable } from '../lib/malleable-component'
import { CheckboxWrapper } from '../lib/checkbox'

import components from './config.json'
import { InputTextWrapper } from '../lib/input-text'
import { SelectWrapper } from '../lib/select'

new CheckboxWrapper()
new InputTextWrapper()
new SelectWrapper()

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
					entry => Malleable.renderInstance( entry, components[entry], changed)
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
