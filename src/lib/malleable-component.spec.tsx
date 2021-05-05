import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { CheckboxWrapper } from './checkbox'
import { InputBoxWrapper } from './input-box'
import { Malleable } from './malleable-component'
import { SelectWrapper } from './select'

new CheckboxWrapper()
new InputBoxWrapper()
new SelectWrapper()

const components = {
	name: {
		type: 'inputbox',
		maxLength: 10,
		label: 'Your name',
		className: 'css-class',
		placeholder: 'test placeholder'
	},
	cardinal: {
		type: 'select',
		values: [
			'one', 'two', 'three'
		],
		label: 'Choose a number'
	},
	truth: {
		type: 'checkbox',
		label: 'Is it true?'
	},
	age: {
		type: 'inputbox',
		label: 'age'
	},
	odd: {
		type: 'select',
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
						entry => Malleable.renderInstance( entry, components[entry], changed )
					)
				}
			</div>
		)
	
	})

	afterEach(()=>{
		changed.mockReset()
	})

	it('should notify text', ()=>{
		const tag = wrapper.getByPlaceholderText( 'test placeholder' )

		fireEvent.input( tag, { target: { value: 'input changed' } })
		expect( changed ).toHaveBeenCalledTimes( 1 )
	})

	it('should notify multiselect', ()=>{
		const tag = wrapper.getAllByRole( 'combobox' )[0]

		fireEvent.change( tag, { target: { value: 1 } })
		expect( changed ).toHaveBeenCalledTimes( 1 )
		expect( changed ).toHaveBeenCalledWith( 'cardinal', 'two' )
	})

})