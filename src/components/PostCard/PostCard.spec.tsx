import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PostCard } from '.';

const mockProps = {
	title: 'postcard',
	body: 'postcard body',
	cover: 'img/img.png',
	id: 1,
};

describe('<PostCard />', () => {
	it('should render PostCard correctly', () => {
		render(<PostCard {...mockProps} />);

		expect(screen.getByRole('img', { name: 'postcard' })).toHaveAttribute('src', 'img/img.png');
		expect(screen.getByRole('heading', { name: 'postcard' })).toBeInTheDocument();
		expect(screen.getByText('postcard body')).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const { container } = render(<PostCard {...mockProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
