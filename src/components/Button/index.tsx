import './style.css';

interface propsButton {
	text: string;
	disabled: boolean;
	onClick: () => void;
}

export function Button(props: propsButton) {
	return (
		<button disabled={props.disabled} className="button" onClick={props.onClick}>
			{props.text}
		</button>
	);
}
