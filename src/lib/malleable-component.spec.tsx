import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Checkbox } from './checkbox'
import { MalleableComponent } from './malleable-component'
import { MultiSelect } from './multi-select'
import { TextInput } from './text-input'

MalleableComponent.registerComponent('text', () => new TextInput() )
MalleableComponent.registerComponent('multiselect', () => new MultiSelect() )
MalleableComponent.registerComponent('boolean', () => new Checkbox() )

const components = {
	name: {
		type: 'text',
		maxLength: 10,
		label: 'Your name',
		className: 'css-class',
		placeholder: 'test placeholder'
	},
	cardinal: {
		type: 'multiselect',
		values: [
			'one', 'two', 'three'
		],
		label: 'Choose a number'
	},
	truth: {
		type: 'boolean',
		label: 'Is it true?'
	}
}

describe( 'Maleable Components', ()=>{
	let wrapper: RenderResult
	let result: {}
	const changed = jest.fn( ( propName, value )=> result[ propName ] = value )

	beforeEach(()=>{
		result = {}

		wrapper = render(
			<div>
				{
					Object.keys( components ).map( 
						entry => MalleableComponent.renderInstance( entry, components[entry], changed )
					)
				}
			</div>
		)
	
	})

	afterEach(()=>{
		changed.mockReset()
		MalleableComponent.result = {}
	})

	it('should notify text', ()=>{
		const tag = wrapper.getByPlaceholderText( 'test placeholder' )

		fireEvent.input( tag, { target: { value: 'input changed' } })
		expect( changed ).toHaveBeenCalledTimes( 1 )
		expect( result ).toEqual( MalleableComponent.result )
	})

	xit('should notify multiselect', ()=>{
		const tag = wrapper.getByRole( 'combobox' )

		fireEvent.change( tag, { target: { value: 'two' } })
		expect( changed ).toHaveBeenCalledTimes( 1 )
		expect( result ).toEqual( MalleableComponent.result )
	})

})