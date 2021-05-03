import React, { useState } from 'react'

import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';

interface TextInputProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
}

@registerMalleableComponent( 'text', ()=>new TextInput() )
export class TextInput extends MalleableComponent<TextInputProps> {

	render() {

		return(
				<Input__ 
					{...this.elementProps }
					onChange={ value => this.changed( value ) }
				/>
		)
	}
}

interface Input__Props extends TextInputProps {
	onChange: ( value: string ) => void
}

function Input__( props: Input__Props ) {
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
