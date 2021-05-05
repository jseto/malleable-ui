export type ChangedValue = ( propName: string, value: unknown ) => void

export interface MalleableComponentProps {
	type: string
	className?: string
	label?: string
	defaultValue?: unknown
}

export interface ValueProps<T> {
	onChange: ( value: T ) => void
}

export abstract class MalleableWrapper {
	abstract render<T, P extends MalleableComponentProps>( propName: string, props: P, onChange: ChangedValue ): JSX.Element
}