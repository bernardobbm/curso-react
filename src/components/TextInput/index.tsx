import './style.css';

interface TextInputProps {
	handleInputChange: (e: any) => void;
	searchValue: string;
}

export function TextInput(props: TextInputProps) {
	return (
		<input
			type="search"
			onChange={props.handleInputChange}
			value={props.searchValue}
			className="text-input"
			placeholder="Type your search"
		/>
	);
}
