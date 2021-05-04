import { fireEvent, render, RenderResult } from '@testing-library/react'
import { MalleableComponent } from './malleable-component'
import { StringInput } from './string-input'

new StringInput()

describe('Input String', ()=>{
	let wrapper: RenderResult
	let inputTag: HTMLInputElement
	const onChange = jest.fn()

	const config = {
		test: {
			type: 'string',
			placeholder: 'test placeholder',
			className: 'css-class',
			maxLength: 10,
			defaultValue: 'default value',
			label: 'test label'
		}
	}
	
	beforeEach(()=>{
		wrapper = render( MalleableComponent.renderInstance( 'test', config.test, onChange ) )
		inputTag = wrapper.getByRole('textbox') as HTMLInputElement
	})

	it('should render a input tag', ()=>{
		expect( inputTag ).toBeInTheDocument()
	})

	it('should notify on changed value', ()=>{
		fireEvent.input( inputTag, { target: { value: 'the nicest test' } })

		expect( onChange ).toHaveBeenCalledWith( 'test', 'the nicest test' )
	})

	it('should fill the MalleableComponent response object', ()=>{
		fireEvent.input( inputTag, { target: { value: 'a nice test' } })

		expect( MalleableComponent.result ).toEqual({
			test: 'a nice test'
		})
	})

	it('should pass props to the underlying element', ()=>{
		expect( inputTag.parentElement ).toHaveClass( 'css-class' )
		expect( inputTag.maxLength ).toBe( 10 )
		expect( inputTag ).toHaveAttribute( 'placeholder', 'test placeholder' )
		expect( inputTag ).toHaveValue( 'default value' )
	})

	it('should have a label tag when label is defined', ()=>{
		const labelTag = wrapper.getByText('test label')

		expect( labelTag ).toBeInTheDocument()
	})

	describe('Multiple choice', ()=>{
		let wrapper: RenderResult
		let selectTag: HTMLSelectElement
		const onChange = jest.fn()
	
		const config = {
			test: {
				type: 'string',
				values: [
					'val1', 'val2', 'val3', 'val4', 'val5'
				],
				defaultValue: 'val4',
				label: 'test label'
			}
		}
		
		beforeEach(()=>{
			wrapper = render( MalleableComponent.renderInstance( 'test', config.test, onChange ) )
			selectTag = wrapper.getByRole('combobox') as HTMLSelectElement
		})
	
		it('should render a select tag', ()=>{
			expect( selectTag ).toBeInTheDocument()
			expect( selectTag.childElementCount ).toBe( 5 )
		})
	
		it('should notify on changed value', ()=>{
			fireEvent.change( selectTag, { target: { value: 'val3' } })
	
			expect( onChange ).toHaveBeenCalledWith( 'test', 'val3' )
		})
	
		it('should fill the MalleableComponent response object', ()=>{
			const selectTag = wrapper.getByRole('combobox')
	
			fireEvent.change( selectTag, { target: { value: 'val3' } })
	
			expect( MalleableComponent.result ).toEqual({
				test: 'val3'
			})
		})
	
	})
})