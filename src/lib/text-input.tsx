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
					propName={ this.propName }
				/>
		)
	}
}

function Input__( props: TextInputProps & { propName: string } ) {
	const { label, placeholder, className, maxLength, propName, defaultValue } = props
	const [ value, setValue ] = useState( defaultValue || '' )

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
					MalleableComponent.onComponentChange( 
						propName, event.target.value 
					)
				}}
			/>
		</div>
	)
}
