import React from 'react'

type FactoryMethod = ()=>MalleableComponent<MalleableComponentProps>

interface FactoryMap {
	[ id: string ]: FactoryMethod
}

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
		return this.factoryMap[ typeName ]() as T
	}
	
	static renderInstance( propName: string, elementProps: MalleableComponentProps ): JSX.Element {
		const instance = this.createInstance( elementProps.type )

		instance.setElementProps( elementProps )
		instance.setPropName( propName )
		
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

	protected setElementProps( props: P ) {
		this.elementProps = props
	}

	protected setPropName( propName: string ) {
		this.propName = propName
	}

	private static factoryMap: FactoryMap = {}
	public static result: MalleableComponentResult = {}
	protected elementProps: P
	protected propName: string
}


export function registerMalleableComponent( typeName: string, factory: FactoryMethod ) {
	MalleableComponent.registerComponent( typeName, factory );
	return ( constructor: Function )=>{
		constructor.prototype.__typeName = typeName;
	}
}

