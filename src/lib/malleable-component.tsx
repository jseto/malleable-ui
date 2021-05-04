import React from 'react'

type FactoryMethod = ()=>MalleableComponent<MalleableComponentProps>

interface FactoryMap {
	[ id: string ]: FactoryMethod
}

type ChangedValue = ( propName: string, value: unknown ) => void

export interface MalleableComponentProps {
	type: string
	defaultValue?: unknown
	className?: string
	label?: string
}

interface MalleableComponentResult {
	[ propName: string ]: unknown
}

export abstract class MalleableComponent<P extends MalleableComponentProps> {
	static registerComponent( typeName: string, factory: FactoryMethod ) {
		this.factoryMap[ typeName ] = factory
	}

	static createInstance<T extends MalleableComponent<MalleableComponentProps>>( typeName: string ): T {
		if ( !this.factoryMap[ typeName ] ) throw new Error( `Type ${ typeName } is not registered in the MalleableComponent factory collection. Please, register it prior to use.` )

		return this.factoryMap[ typeName ]() as T
	}
	
	static renderInstance( propName: string, elementProps: MalleableComponentProps, onChange?: ChangedValue ): JSX.Element {
		const instance = this.createInstance( elementProps.type )

		instance.elementProps = elementProps
		instance.propName = propName
		instance.onChange = onChange
		
		return (
			<div key={ propName }>
				{ instance.render() }
			</div>
		)
	}

	static onComponentChange( propName: string, value: unknown ) {
		this.result[ propName ] = value
	}
	
	abstract render(): JSX.Element

	changed( value: unknown ) {

		if ( this.onChange ) {
			this.onChange( this.propName, value )
		}

		MalleableComponent.onComponentChange( this.propName, value )

	}

	private static factoryMap: FactoryMap = {}
	public static result: MalleableComponentResult = {}
	protected elementProps: P
	protected propName: string
	protected onChange: ChangedValue
}


export function registerMalleableComponent( typeName: string, factory: FactoryMethod ) {
	MalleableComponent.registerComponent( typeName, factory );
	return ( constructor: Function )=>{
		constructor.prototype.__typeName = typeName;
	}
}

