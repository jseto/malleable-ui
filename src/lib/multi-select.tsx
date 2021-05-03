import React, { useState } from 'react'
import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';

interface MultiSelectProps extends MalleableComponentProps {
	values: string[] | number[]
}

@registerMalleableComponent( 'multiselect', ()=>new MultiSelect() )
export class MultiSelect extends MalleableComponent<MultiSelectProps> {
	render() {

		return (
			<Select__ 
				{...this.elementProps }
				onChange={ value => this.changed( value ) }
			/>
		)
	}
}

interface Select__Props extends MultiSelectProps {
	onChange: ( value: string ) => void
}

function Select__( props: Select__Props ) {
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