import React, { useState } from 'react'

import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';

interface CheckboxProps extends MalleableComponentProps {
}

@registerMalleableComponent( 'boolean', ()=>new Checkbox() )
export class Checkbox extends MalleableComponent<CheckboxProps> {

	render() {

		return(
				<Input__ 
					{...this.elementProps }
					onChange={ value => this.changed( value ) }
				/>
		)
	}
}

interface Input__Props extends CheckboxProps {
	onChange: ( value: boolean ) => void
}

function Input__( props: Input__Props ) {
	const { label, className, defaultValue, onChange } = props
	const [ checked, setChecked ] = useState( Boolean( defaultValue ) )

	return(
		<div className={`malleable-ui checkbox ${ className || '' }`}>
			{ label && 
				<label>{ label }</label>
			}
			<input type="checkbox" 
				checked={ checked }
				onChange={ event => {
					setChecked( event.target.checked )
					onChange( event.target.checked )
				}}
			/>
		</div>
	)
}
