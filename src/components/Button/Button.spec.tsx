import { describe, expect, it, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

const fn = vitest.fn();

describe('Button Component', () => {
	it('should render the button with the text', () => {
		render(
			<Button
				onClick={fn}
				disabled={false}
				text="load more"
			/>
		);

		const button = screen.getByRole('button', { name: /load more/i });
		expect(button).toBeInTheDocument();
	});

	it('should call a function on button click', () => {
		render(
			<Button
				onClick={fn}
				disabled={false}
				text="load more"
			/>
		);

		const button = screen.getByRole('button', { name: /load more/i });
		fireEvent.click(button);

		expect(fn).toHaveBeenCalled();
	});

	it('should be disabled when disable prop is true', () => {
		render(
			<Button
				onClick={fn}
				disabled={true}
				text="load more"
			/>
		);

		const button = screen.getByRole('button', { name: /load more/i });

		expect(button).toBeDisabled();
	});

	it('should match snapshot', () => {
		const { container } = render(
			<Button
				onClick={fn}
				disabled={true}
				text="load more"
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
