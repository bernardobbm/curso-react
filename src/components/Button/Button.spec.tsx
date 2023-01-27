import { describe, expect, it, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button Component', () => {
	it('should render the button with the text', () => {
		const fn = vitest.fn();

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
		const fn = vitest.fn();

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
		const fn = vitest.fn();

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
});
