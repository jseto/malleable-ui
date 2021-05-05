import React, { useState } from 'react'

import { registerMalleableComponent } from './malleable-component';
import { ChangedValue, ValueProps, MalleableComponentProps, MalleableWrapper } from './wrapper';

interface CheckboxProps extends MalleableComponentProps  {
}

@registerMalleableComponent( 'checkbox', ()=>new CheckboxWrapper() )
export class CheckboxWrapper extends MalleableWrapper {

	render( propName: string, props: MalleableComponentProps, onChange: ChangedValue) {

		return(
				<Checkbox 
					{ ...props }
					onChange={ value => onChange && onChange( propName, value ) }
				/>
		)
	}
}

function Checkbox( props: CheckboxProps & ValueProps<boolean>) {
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
