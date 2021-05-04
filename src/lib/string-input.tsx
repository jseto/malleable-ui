import React, { useState } from 'react'

import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';

interface StringInputProps extends MalleableComponentProps {
	maxLength?: number
	placeholder?: string
	values?: string[]
}

@registerMalleableComponent( 'string', ()=>new StringInput() )
export class StringInput extends MalleableComponent<StringInputProps> {

	render() {

		if ( this.elementProps.values ) {

			return (
				<Select__ 
					{...this.elementProps }
					onChange={ value => this.changed( value ) }
				/>
			)
	
		}
		else {

			return(
					<Input__ 
						{...this.elementProps }
						onChange={ value => this.changed( value ) }
					/>
			)

		}
	}
}

interface Input__Props extends StringInputProps {
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


interface Select__Props extends StringInputProps {
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
