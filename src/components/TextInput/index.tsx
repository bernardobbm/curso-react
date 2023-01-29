import './style.css';

interface TextInputProps {
	handleInputChange: (e: any) => void;
	searchValue: string;
}

export function TextInput({ searchValue, handleInputChange }: TextInputProps) {
	return (
		<input
			type="search"
			onChange={handleInputChange}
			value={searchValue}
			className="text-input"
			placeholder="Type your search"
		/>
	);
}
