import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Checkbox } from './checkbox'
import { MalleableComponent, registerMalleableComponent } from './malleable-component'

registerMalleableComponent('boolean', ()=>new Checkbox())

describe('Multi Select', ()=>{
	let wrapper: RenderResult
	let inputTag: HTMLInputElement
	const onChange = jest.fn()

	const config = {
		test: {
			type: 'boolean',
			className: 'css-class',
			defaultValue: true,
			label: 'test label',
		}
	}
	
	beforeEach(()=>{
		wrapper = render( MalleableComponent.renderInstance( 'test', config.test, onChange ) )
		inputTag = wrapper.getByRole('checkbox') as HTMLInputElement
	})

	it('should render a input tag', ()=>{
		const inputTag = wrapper.getByRole('checkbox')

		expect( inputTag ).toBeInTheDocument()
	})

	it('should notify on changed value', ()=>{
		fireEvent.click( inputTag )
		expect( onChange ).toHaveBeenCalledWith( 'test', false )

		fireEvent.click( inputTag )
		expect( onChange ).toHaveBeenCalledWith( 'test', true )
	})

	it('should fill the MalleableComponent response object', ()=>{
		const inputTag = wrapper.getByRole('checkbox')

		fireEvent.click( inputTag )
		expect( MalleableComponent.result ).toEqual({
			test: false
		})

		fireEvent.click( inputTag )
		expect( MalleableComponent.result ).toEqual({
			test: true
		})
	})

	it('should pass props to the underlying element', ()=>{
		const inputTag = wrapper.getByRole('checkbox') as HTMLInputElement
		
		expect( inputTag.parentElement ).toHaveClass( 'css-class' )
		expect( inputTag.value ).toBeTruthy()
	})

	it('should have a label tag when label is defined', ()=>{
		const labelTag = wrapper.getByText('test label')

		expect( labelTag ).toBeInTheDocument()
	})
})