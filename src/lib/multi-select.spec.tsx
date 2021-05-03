import { fireEvent, render, RenderResult } from '@testing-library/react'
import { MalleableComponent, registerMalleableComponent } from './malleable-component'
import { MultiSelect } from './multi-select'

registerMalleableComponent('multiselect', ()=>new MultiSelect())

describe('Multi Select', ()=>{
	let wrapper: RenderResult

	const config = {
		test: {
			type: 'multiselect',
			className: 'css-class',
			defaultValue: 'val4',
			label: 'test label',
			values: [
				'val1', 'val2', 'val3', 'val4', 'val5'
			]
		}
	}
	
	beforeEach(()=>{
		wrapper = render( MalleableComponent.renderInstance( 'test', config.test ) )
	})

	it('should render a select tag', ()=>{
		const selectTag = wrapper.getByRole('combobox')

		expect( selectTag ).toBeInTheDocument()
		expect( selectTag.childElementCount ).toBe( 5 )
	})

	it('should fill the MalleableComponent response object', ()=>{
		const selectTag = wrapper.getByRole('combobox')

		fireEvent.change( selectTag, { target: { value: 'val3' } })

		expect( MalleableComponent.result ).toEqual({
			test: 'val3'
		})
	})

	it('should pass props to the underlying element', ()=>{
		const selectTag = wrapper.getByRole('combobox') as HTMLInputElement
		
		expect( selectTag.parentElement ).toHaveClass( 'css-class' )
		expect( selectTag ).toHaveValue( 'val4' )
	})

	it('should have a label tag when label is defined', ()=>{
		const labelTag = wrapper.getByText('test label')

		expect( labelTag ).toBeInTheDocument()
	})
})