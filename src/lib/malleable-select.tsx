import React, { useState } from 'react'
import { InputProps } from './maleable-input'

interface Select__Props extends InputProps {
	onChange: ( value: string ) => void
	type: string
}

export function MalleableSelect( props: Select__Props ) {
	const { label, values, defaultValue, className, onChange } = props
	const [ value, setValue ] = useState( defaultValue as string || '' )

	return (
		<div className={`malleable-ui multi-select ${ className || '' }`}>
			{ label &&
				<label>{ label }</label>
			}
			<select 
				value={ value }
				onChange={ event => {
					setValue( event.target.value )
					onChange( event.target.value )
				}}
			>
				{
					values.map( value => (
						<option key={ value } value={ value }>{ value }</option>
					))
				}
			</select>
		</div>

	)
}
