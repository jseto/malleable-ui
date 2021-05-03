import { fireEvent, render, RenderResult } from '@testing-library/react'
import { MalleableComponent, registerMalleableComponent } from './malleable-component'
import { TextInput } from './text-input'

registerMalleableComponent('text', ()=>new TextInput())

describe('Input Text', ()=>{
	let wrapper: RenderResult

	const config = {
		test: {
			type: 'text',
			placeholder: 'test placeholder',
			className: 'css-class',
			maxLength: 10,
			defaultValue: 'default value',
			label: 'test label'
		}
	}
	
	beforeEach(()=>{
		wrapper = render( MalleableComponent.renderInstance( 'test', config.test ) )
	})

	it('should render a input tag', ()=>{
		const inputTag = wrapper.getByRole('textbox')

		expect( inputTag ).toBeInTheDocument()
	})

	it('should fill the MalleableComponent response object', ()=>{
		const inputTag = wrapper.getByRole('textbox')

		fireEvent.input( inputTag, { target: { value: 'a nice test' } })

		expect( MalleableComponent.result ).toEqual({
			test: 'a nice test'
		})
	})

	it('should pass props to the underlying element', ()=>{
		const inputTag = wrapper.getByRole('textbox') as HTMLInputElement
		
		expect( inputTag.parentElement ).toHaveClass( 'css-class' )
		expect( inputTag.maxLength ).toBe( 10 )
		expect( inputTag ).toHaveAttribute( 'placeholder', 'test placeholder' )
		expect( inputTag ).toHaveValue( 'default value' )
	})

	it('should have a label tag when label is defined', ()=>{
		const labelTag = wrapper.getByText('test label')

		expect( labelTag ).toBeInTheDocument()
	})
})