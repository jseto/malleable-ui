import React from 'react'
import { InputProps, MalleableInput } from './maleable-input';

import { MalleableComponent, registerMalleableComponent } from './malleable-component';
import { MalleableSelect } from './malleable-select';

@registerMalleableComponent( 'number', ()=>new NumberInput() )
export class NumberInput extends MalleableComponent<InputProps> {

	render() {

		if ( this.elementProps.values ) {

			return (
				<MalleableSelect 
					{...this.elementProps }
					type="number"
					onChange={ value => this.changed( Number(value) ) }
				/>
			)
	
		}
		else {

			return(
					<MalleableInput
						type="number"
						{...this.elementProps }
						onChange={ value => this.changed( Number( value ) ) }
					/>
			)

		}
	}
}
