import { fireEvent, render, RenderResult } from '@testing-library/react'
import { MalleableComponent } from './malleable-component'
import { NumberInput } from './number-input'

new NumberInput()

describe('Input String', ()=>{

	describe( 'Unique value', ()=>{
		let wrapper: RenderResult
		let inputTag: HTMLInputElement
		const onChange = jest.fn()

		const config = {
			test: {
				type: 'number',
				placeholder: 'test placeholder',
				className: 'css-class',
				defaultValue: 365,
				label: 'test label'
			}
		}
		
		beforeEach(()=>{
			wrapper = render( MalleableComponent.renderInstance( 'test', config.test, onChange ) )
			inputTag = wrapper.getByRole('spinbutton') as HTMLInputElement
		})

		it('should render a input tag', ()=>{
			expect( inputTag ).toBeInTheDocument()
		})

		it('should notify on changed value', ()=>{
			fireEvent.input( inputTag, { target: { value: 89 } })

			expect( onChange ).toHaveBeenCalledWith( 'test', 89 )
		})

		it('should fill the MalleableComponent response object', ()=>{
			fireEvent.input( inputTag, { target: { value: 56 } })

			expect( MalleableComponent.result ).toEqual({
				test: 56
			})
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

	describe('Multiple choice', ()=>{
		let wrapper: RenderResult
		let selectTag: HTMLSelectElement
		const onChange = jest.fn()
	
		const config = {
			test: {
				type: 'number',
				values: [
					1, 2, 3, 4, 5
				],
				defaultValue: 4,
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
			fireEvent.change( selectTag, { target: { value: 3 } })
	
			expect( onChange ).toHaveBeenCalledWith( 'test', 3 )
		})
	
		it('should fill the MalleableComponent response object', ()=>{
			const selectTag = wrapper.getByRole('combobox')
	
			fireEvent.change( selectTag, { target: { value: 3 } })
	
			expect( MalleableComponent.result ).toEqual({
				test: 3
			})
		})
	
	})
})