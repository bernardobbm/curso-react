import { describe, expect, it, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

const fn = vitest.fn();

describe('<TextInput />', () => {
	it('should have a value on searchValue', () => {
		render(
			<TextInput
				searchValue="testing"
				handleInputChange={fn}
			/>
		);

		const inputText = screen.getByPlaceholderText(/type your search/i) as HTMLInputElement;
		expect(inputText.value).toBe('testing');
	});

	it('should call handleChange function on each key pressed', async () => {
		render(
			<TextInput
				searchValue="this first value"
				handleInputChange={fn}
			/>
		);

		const value = 'this value';

		const inputText = screen.getByPlaceholderText(/type your search/i) as HTMLInputElement;

		await userEvent.type(inputText, value);

		expect(inputText.value).toBe('this first value');
		expect(fn).toHaveBeenCalledTimes(value.length);
	});

	it('should match snapshot', () => {
		const { container } = render(
			<TextInput
				searchValue=""
				handleInputChange={fn}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
