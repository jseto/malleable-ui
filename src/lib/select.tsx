import React, { useState } from 'react';
import { registerMalleableComponent } from './malleable-component';
import { MalleableComponentProps, MalleableWrapper, ChangedValue, ValueProps } from './wrapper';

interface SelectProps extends MalleableComponentProps  {
	values?: string[]
}

@registerMalleableComponent( 'select', ()=>new SelectWrapper() )
export class SelectWrapper extends MalleableWrapper {

	render( propName: string, props: MalleableComponentProps, onChange: ChangedValue) {

		return(
				<Select 
					{ ...props }
					onChange={ value => onChange && onChange( propName, value ) }
				/>
		)
	}
}

function Select( props: SelectProps & ValueProps<string>) {
	const { label, values, defaultValue, className, onChange } = props
	const defVal = parseValue( values.findIndex( val => parseValue( val ).label === defaultValue as string  ) ).label
	const [ value, setValue ] = useState( defVal || '' )

	return (
		<div className={`malleable-ui select ${ className || '' }`}>
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