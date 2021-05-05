import React, { useState } from 'react'
import { registerMalleableComponent } from './malleable-component';
import { ChangedValue, MalleableComponentProps, MalleableWrapper, ValueProps } from './wrapper';

export interface InputTextProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
}

@registerMalleableComponent( 'inputtext', ()=>new InputTextWrapper() )
export class InputTextWrapper extends MalleableWrapper {

	render( propName: string, props: MalleableComponentProps, onChange: ChangedValue) {

		return(
			<InputText
					{ ...props }
					onChange={ value => onChange && onChange( propName, value ) }
				/>
		)
	}
}

function InputText( props: InputTextProps & ValueProps<string> ) {
	const { label, placeholder, className, maxLength, defaultValue, onChange } = props
	const [ value, setValue ] = useState( defaultValue as string || '' )

	return(
		<div className={`malleable-ui input-text ${ className || '' }`}>
			{ label && 
				<label>{ label }</label>
			}
			<input type="text"
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
