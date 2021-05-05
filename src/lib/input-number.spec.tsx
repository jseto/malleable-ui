import { fireEvent, render, RenderResult } from '@testing-library/react'
import { InputNumberWrapper } from './input-number'
import { Malleable } from './malleable-component'

new InputNumberWrapper()

describe('Input Number', ()=>{
	let wrapper: RenderResult
	let inputTag: HTMLInputElement
	const onChange = jest.fn()

	const config = {
		test: {
			type: 'inputnumber',
			placeholder: 'test placeholder',
			className: 'css-class',
			defaultValue: 365,
			label: 'test label'
		}
	}
	
	beforeEach(()=>{
		wrapper = render( Malleable.renderInstance( 'test', config.test, onChange ) )
		inputTag = wrapper.getByRole('spinbutton') as HTMLInputElement
	})

	it('should render a input tag', ()=>{
		expect( inputTag ).toBeInTheDocument()
	})

	it('should notify on changed value', ()=>{
		fireEvent.input( inputTag, { target: { value: 89 } })

		expect( onChange ).toHaveBeenCalledWith( 'test', 89 )
	})

	it('should pass props to the underlying element', ()=>{
		expect( inputTag.parentElement ).toHaveClass( 'css-class' )
		expect( inputTag ).toHaveAttribute( 'placeholder', 'test placeholder' )
		expect( inputTag ).toHaveValue( 365 )
	})

	it('should have a label tag when label is defined', ()=>{
		const labelTag = wrapper.getByText('test label')

		expect( labelTag ).toBeInTheDocument()
	})
})

