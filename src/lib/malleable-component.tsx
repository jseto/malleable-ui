import React from 'react'
import { ChangedValue, MalleableComponentProps, MalleableWrapper } from './wrapper'

type WrapperFactory = ()=>MalleableWrapper

interface FactoryMap {
	[ id: string ]: WrapperFactory
}

interface MalleableComponentResult {
	[ propName: string ]: unknown
}

export abstract class Malleable {
	static registerComponent( typeName: string, factory: WrapperFactory ) {
		this.factoryMap[ typeName ] = factory
	}

	static createInstance<T extends MalleableWrapper>( typeName: string ): T {
		if ( !this.factoryMap[ typeName ] ) throw new Error( `Malleable component wrapper ${ typeName } is not registered in the MalleableComponent factory collection. Please, register it prior to use.` )

		return this.factoryMap[ typeName ]() as T
	}
	
	static renderInstance( propName: string, props: MalleableComponentProps, onChange?: ChangedValue ): JSX.Element {
		const instance = this.createInstance( props.type )
		
		return (
			<div key={ propName }>
				{ instance.render( propName, props, onChange ) }
			</div>
		)
	}

	private static factoryMap: FactoryMap = {}
}


export function registerMalleableComponent( typeName: string, factory: WrapperFactory ) {
	Malleable.registerComponent( typeName, factory );
	return ( constructor: Function )=>{
		constructor.prototype.__typeName = typeName;
	}
}

