import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Malleable } from './malleable-component'
import { InputBoxWrapper } from './input-box'

new InputBoxWrapper()

describe('Input String', ()=>{
	describe( 'Unique value', ()=>{
		let wrapper: RenderResult
		let inputTag: HTMLInputElement
		const onChange = jest.fn()
	
		const config = {
			test: {
				type: 'inputbox',
				placeholder: 'test placeholder',
				className: 'css-class',
				maxLength: 10,
				defaultValue: 'default value',
				label: 'test label'
			}
		}
		
		beforeEach(()=>{
			wrapper = render( Malleable.renderInstance( 'test', config.test, onChange ) )
			inputTag = wrapper.getByRole('textbox') as HTMLInputElement
		})
	
		it('should render a input tag', ()=>{
			expect( inputTag ).toBeInTheDocument()
		})
	
		it('should notify on changed value', ()=>{
			fireEvent.input( inputTag, { target: { value: 'the nicest test' } })
	
			expect( onChange ).toHaveBeenCalledWith( 'test', 'the nicest test' )
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

	})
})