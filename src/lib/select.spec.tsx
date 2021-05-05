import { RenderResult, fireEvent, render } from '@testing-library/react'
import { Malleable } from './malleable-component'
import { SelectWrapper } from './select'

new SelectWrapper()

describe('Select', ()=>{
	describe( 'String values', ()=>{
		let wrapper: RenderResult
		let selectTag: HTMLSelectElement
		const onChange = jest.fn()

		const config = {
			test: {
				type: 'select',
				values: [
					'val1', 'val2', 'val3', 'val4', 'val5'
				],
				defaultValue: 'val4',
				label: 'test label'
			}
		}
		
		beforeEach(()=>{
			wrapper = render( Malleable.renderInstance( 'test', config.test, onChange ) )
			selectTag = wrapper.getByRole('combobox') as HTMLSelectElement
		})

		it('should render a select tag', ()=>{
			expect( selectTag ).toBeInTheDocument()
			expect( selectTag.childElementCount ).toBe( 5 )
		})

		it('should notify on changed value', ()=>{
			fireEvent.change( selectTag, { target: { value: 2 } })

			expect( onChange ).toHaveBeenCalledWith( 'test', 'val3' )
		})
	})

	describe('Numeric values', ()=>{
		let wrapper: RenderResult
		let selectTag: HTMLSelectElement
		const onChange = jest.fn()
	
		const config = {
			test: {
				type: 'select',
				values: [
					0, 1, 2, 3, 4, 5
				],
				defaultValue: 4,
				label: 'test label'
			}
		}
		
		beforeEach(()=>{
			wrapper = render( Malleable.renderInstance( 'test', config.test, onChange ) )
			selectTag = wrapper.getByRole('combobox') as HTMLSelectElement
		})
	
		it('should render a select tag', ()=>{
			expect( selectTag ).toBeInTheDocument()
			expect( selectTag.childElementCount ).toBe( 6 )
		})
	
		it('should notify on changed value', ()=>{
			fireEvent.change( selectTag, { target: { value: 3 } })
	
			expect( onChange ).toHaveBeenCalledWith( 'test', 3 )
		})
	})

})
