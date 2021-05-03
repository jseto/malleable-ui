import React from 'react'
import TestIcon from '@fortawesome/fontawesome-free/svgs/brands/accessible-icon.svg'
import './test-environment.scss'
import { MalleableComponent, MalleableComponentProps } from '../lib/malleable-component'
import { TextInput } from '../lib/text-input'
import { MultiSelect } from '../lib/multi-select'

MalleableComponent.registerComponent('text', () => new TextInput() )
MalleableComponent.registerComponent('multiselect', () => new MultiSelect() )

// const components = [
// 	{
// 		type: 'text',
// 		name: 'name',
// 		maxLength: 5,
// 		label: 'Your name'
// 	},
// 	{
// 		type: 'multiselect',
// 		name: 'cardinal',
// 		values: [
// 			'one', 'two', 'three'
// 		],
// 		label: 'Choose a number'
// 	}
// ]

const components = {
	name: {
		type: 'text',
		maxLength: 10,
		label: 'Your name',
		className: 'css-class'
	},
	cardinal: {
		type: 'multiselect',
		values: [
			'one', 'two', 'three'
		],
		label: 'Choose a number'
	}
}

export function App() {
	return (
		<> 
			<h1 className="test-header">Hi there!</h1>
			<TestIcon width="1em"/>
			{
				Object.keys( components ).map( entry => MalleableComponent.renderInstance( entry, components[entry] ) )
			}
			<button 
				onClick={ ()=>console.log( MalleableComponent.result ) }
			>
				Results
			</button>
		</>
	)
}
