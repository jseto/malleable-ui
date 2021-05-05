import React, { useState } from 'react'
import { registerMalleableComponent } from './malleable-component';
import { ChangedValue, MalleableComponentProps, MalleableWrapper, ValueProps } from './wrapper';

export interface InputProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
}

@registerMalleableComponent( 'inputbox', ()=>new InputBoxWrapper() )
export class InputBoxWrapper extends MalleableWrapper {

	render( propName: string, props: MalleableComponentProps, onChange: ChangedValue) {

		return(
			<Input type="text"
					{ ...props }
					onChange={ value => onChange && onChange( propName, value ) }
				/>
		)
	}
}

export function Input( props: InputProps & ValueProps<string> ) {
	const { type, label, placeholder, className, maxLength, defaultValue, onChange } = props
	const [ value, setValue ] = useState( defaultValue as string || '' )

	return(
		<div className={`malleable-ui input-text ${ className || '' }`}>
			{ label && 
				<label>{ label }</label>
			}
			<input type={ type }
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
