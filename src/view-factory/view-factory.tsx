import React, { Component, ComponentClass, FunctionComponent, ReactElement } from 'react'

interface ViewFactoryProps<P> {
	viewFor: string
	props: P
}

export class ViewFactory<P> extends Component<ViewFactoryProps<P>> {
	static registerView<P>( className: string, view: FunctionComponent<P> | ComponentClass<P> | string ) {
		this._factories[ className ] = ( props: P ) => React.createElement( view, props )
	}

	static renderView<P>( className: string, props: P): JSX.Element {
		const factory = this._factories[ className ]
		if ( !factory ) throw new Error( `You should register a ${ className } view prior to use` )

		return factory( props )
	}

	// force view registration
	static useViews( _views: (FunctionComponent<unknown> | ComponentClass<unknown>)[] ){}

	render() {
		const { viewFor, props } = this.props

		return (
			ViewFactory.renderView<P>( viewFor, props )
		)
	}

	private static _factories: {[ className: string ]: ( props: unknown )=>ReactElement } = {}
}

export function viewerFor( dataForViewClassname: string ) {
	return function( constructor: Function ) {
		ViewFactory.registerView( dataForViewClassname, constructor as any )
	}
}
