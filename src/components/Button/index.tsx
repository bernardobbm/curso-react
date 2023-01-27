import './style.css';

interface propsButton {
	text: string;
	disabled: boolean;
	onClick: () => void;
}

export function Button({ text, disabled, onClick }: propsButton) {
	return (
		<button
			disabled={disabled}
			className="button"
			onClick={onClick}
		>
			{text}
		</button>
	);
}
