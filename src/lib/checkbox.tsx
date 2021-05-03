import React, { useState } from 'react'

import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';

interface CheckboxProps extends MalleableComponentProps {
}

@registerMalleableComponent( 'text', ()=>new Checkbox() )
export class Checkbox extends MalleableComponent<CheckboxProps> {

	render() {

		return(
				<Input__ 
					{...this.elementProps }
					propName={ this.propName }
				/>
		)
	}
}

function Input__( props: CheckboxProps & { propName: string } ) {
	const { label, className, propName, defaultValue } = props
	const [ checked, setChecked ] = useState( Boolean( defaultValue ) )

	return(
		<div className={`malleable-ui input-text ${ className || '' }`}>
			{ label && 
				<label>{ label }</label>
			}
			<input type="checkbox" 
				checked={ checked }
				onChange={ event => {
					setChecked( event.target.checked )
					MalleableComponent.onComponentChange( 
						propName, event.target.checked 
					)
				}}
			/>
		</div>
	)
}
