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
				propName={ this.propName }
			/>
		)
	}
}

function Select__( props: MultiSelectProps & { propName: string } ) {
	const { label, values, defaultValue, className, propName } = props
	const [ value, setValue ] = useState( defaultValue || '' )

	return (
		<div className={`malleable-ui multi-select ${ className || '' }`}>
			{ label &&
				<label>{ label }</label>
			}
			<select 
				value={ value }
				onChange={ event => {
					setValue( event.target.value )
					MalleableComponent.onComponentChange( 
						propName, event.target.value 
					)
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