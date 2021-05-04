import React from 'react'
import { MalleableInput } from './maleable-input';

import { MalleableComponent, MalleableComponentProps, registerMalleableComponent } from './malleable-component';
import { MalleableSelect } from './malleable-select';

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
				<MalleableSelect
					{...this.elementProps }
					type="text"
					onChange={ value => this.changed( value ) }
				/>
			)
	
		}
		else {

			return(
					<MalleableInput 
						{...this.elementProps }
						type="text"
						onChange={ value => this.changed( value ) }
					/>
			)

		}
	}
}
