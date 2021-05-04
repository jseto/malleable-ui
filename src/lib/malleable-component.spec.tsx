import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Checkbox } from './checkbox'
import { MalleableComponent } from './malleable-component'
import { NumberInput } from './number-input'
import { StringInput } from './string-input'

new StringInput()
new Checkbox() 
new NumberInput()

const components = {
	name: {
		type: 'string',
		maxLength: 10,
		label: 'Your name',
		className: 'css-class',
		placeholder: 'test placeholder'
	},
	cardinal: {
		type: 'string',
		values: [
			'one', 'two', 'three'
		],
		label: 'Choose a number'
	},
	truth: {
		type: 'boolean',
		label: 'Is it true?'
	},
	age: {
		type: 'number',
		label: 'age'
	},
	odd: {
		type: 'number',
		label: 'Select a number',
		values: [ 1, 2, 3, 5, 7, 9 ]
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