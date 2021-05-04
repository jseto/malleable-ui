import React, { useState } from 'react'
import { InputProps } from './maleable-input'

interface MalleableSelectProps extends InputProps {
	onChange: ( value: string ) => void
	type: string
}

export function MalleableSelect( props: MalleableSelectProps ) {
	const { label, values, defaultValue, className, onChange } = props
	const defVal = parseValue( values.findIndex( val => parseValue( val ).label === defaultValue as string  ) ).label
	const [ value, setValue ] = useState( defVal || '' )

	return (
		<div className={`malleable-ui multi-select ${ className || '' }`}>
			{ label &&
				<label>{ label }</label>
			}
			<select 
				value={ value }
				onChange={ event => {
					setValue( event.target.value )
					onChange( values[ Number( event.target.value ) ] )
				}}
			>
				{
					values.map( ( optionVal, idx ) => {
						const val = parseValue( optionVal )
						return (
							<option key={ val.label } value={ idx }>{ val.label }</option>
						)
					})
				}
			</select>
		</div>

	)
}

function parseValue( value ) {
	if( typeof( value ) !== 'object' ) {
		return {
			label: value,
			value: value
		}
	} 
	else {
		return value
	}


}