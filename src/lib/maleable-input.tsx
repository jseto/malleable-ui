import React, { useState } from 'react'
import { MalleableComponentProps } from './malleable-component'

export interface InputProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
	values?: string[]
}

interface MalleableInputProps extends InputProps {
	type: string
	onChange: ( value: string ) => void
}

export function MalleableInput( props: MalleableInputProps ) {
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

