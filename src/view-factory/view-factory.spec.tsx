import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { viewerFor, ViewFactory } from './view-factory'

interface TestComp1Props {
	prop1: string
}

@viewerFor( 'Data1' )
class TestComp1 extends Component<TestComp1Props> {
	render() {
		return(
			<p>Test Component 1 { this.props.prop1 }</p>
		)
	}
}

interface TestComp2Props {
	prop2: string
}

class TestComp2 extends Component<TestComp2Props> {
	render() {
		return(
			<p>Test Component 2 { this.props.prop2 }</p>
		)
	}
}
ViewFactory.registerView( 'Data2', TestComp2 )
	
interface TestComp3Props {
	prop3: string
}

ViewFactory.registerView( 'Data3', TestComp3 )
function TestComp3( props: TestComp3Props ) {
	return(
		<p>Test Component 3 { props.prop3 }</p>
	)
}

describe( 'View Factory', ()=>{
	describe( 'As class', ()=>{
		
		it( 'should throw if not registered', ()=>{
			expect(()=>{
				ViewFactory.renderView( 'pepe', {})
			}).toThrow( 'You should register a pepe view prior to use' )
		})
	
		it( 'should render component 1', ()=>{
			const wrapper = render(
				ViewFactory.renderView<TestComp1Props>( 'Data1', { prop1: 'the prop 1' })
			)

			expect( 
				wrapper.getByText( 'Test Component 1 the prop 1') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 2', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 3', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
		it( 'should render component 2', ()=>{
			const wrapper = render(
				ViewFactory.renderView( 'Data2', { prop2: 'the prop 2' })
			)

			expect( 
				wrapper.getByText( 'Test Component 2 the prop 2') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 1', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 3', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
		it( 'should render component 3', ()=>{
			const wrapper = render(
				ViewFactory.renderView<TestComp3Props>( 'Data3', { prop3: 'the prop 3' })
			)

			expect( 
				wrapper.getByText( 'Test Component 3 the prop 3') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 2', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 1', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
	})	

	describe( 'As React Component', ()=>{
		
		it( 'should throw if not registered', ()=>{
			const errorSpy = jest.spyOn( console, 'error' ).mockImplementation(()=>{})

			expect(()=>{
				render( <ViewFactory viewFor={ 'pepe' } props={{}}/> )
			}).toThrow( 'You should register a pepe view prior to use' )
			
			errorSpy.mockRestore()
		})
		
		it( 'should render component 1', ()=>{
			const wrapper = render(
				<ViewFactory viewFor={ 'Data1' } props={{ prop1: 'the prop 1' }}/>
			)

			expect( 
				wrapper.getByText( 'Test Component 1 the prop 1') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 2', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 3', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
		it( 'should render component 2', ()=>{
			const wrapper = render(
				<ViewFactory viewFor={ 'Data2' } props={{ prop2: 'the prop 2' }}/>
			)

			expect( 
				wrapper.getByText( 'Test Component 2 the prop 2') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 1', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 3', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
		it( 'should render component 3', ()=>{
			const wrapper = render(
				<ViewFactory viewFor={ 'Data3' } props={{ prop3: 'the prop 3' }}/>
			)

			expect( 
				wrapper.getByText( 'Test Component 3 the prop 3') 
			).toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 2', { exact: false }) 
			).not.toBeInTheDocument()

			expect( 
				wrapper.queryByText( 'Test Component 1', { exact: false }) 
			).not.toBeInTheDocument()
		})
		
	})	

})