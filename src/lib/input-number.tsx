import React, { useState } from 'react'
import { registerMalleableComponent } from './malleable-component';
import { ChangedValue, MalleableComponentProps, MalleableWrapper, ValueProps } from './wrapper';

export interface InputNumberProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
}

@registerMalleableComponent( 'inputnumber', ()=>new InputNumberWrapper() )
export class InputNumberWrapper extends MalleableWrapper {

	render( propName: string, props: MalleableComponentProps, onChange: ChangedValue) {

		return(
			<InputNumber
					{ ...props }
					onChange={ value => onChange && onChange( propName, value ) }
				/>
		)
	}
}

function InputNumber( props: InputNumberProps & ValueProps<string> ) {
	const { label, placeholder, className, maxLength, defaultValue, onChange } = props
	const [ value, setValue ] = useState( defaultValue as string || '' )

	return(
		<div className={`malleable-ui input-number ${ className || '' }`}>
			{ label && 
				<label>{ label }</label>
			}
			<input type="number"
				placeholder={ placeholder || label || '' }
				maxLength={ maxLength }
				value={ value }
				onChange={ event => {
					setValue( event.target.value )
					onChange( event.target.value )
				}}
			/>
		</div>
	)
}
