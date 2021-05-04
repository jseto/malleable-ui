import React from 'react'
import TestIcon from '@fortawesome/fontawesome-free/svgs/brands/accessible-icon.svg'
import './test-environment.scss'
import { MalleableComponent } from '../lib/malleable-component'
import { TextInput } from '../lib/text-input'
import { MultiSelect } from '../lib/multi-select'
import { Checkbox } from '../lib/checkbox'

import components from './config.json'

MalleableComponent.registerComponent('text', () => new TextInput() )
MalleableComponent.registerComponent('multiselect', () => new MultiSelect() )
MalleableComponent.registerComponent('boolean', () => new Checkbox() )

// const components = {
// 	name: {
// 		type: 'text',
// 		maxLength: 10,
// 		label: 'Your name',
// 		className: 'css-class'
// 	},
// 	cardinal: {
// 		type: 'multiselect',
// 		values: [
// 			'one', 'two', 'three'
// 		],
// 		label: 'Choose a number'
// 	},
// 	truth: {
// 		type: 'boolean',
// 		label: 'Is it true?'
// 	}
// }

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
