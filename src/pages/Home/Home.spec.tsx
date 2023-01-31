import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { server } from '../../mocks/server';
import { Home } from '.';

describe('<Home />', () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it('should render search, post and load more', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não foram encontrados nenhum post');

		expect.assertions(3);

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);
		expect(search).toBeInTheDocument();

		const images = screen.getAllByRole('img', { name: /title/i });
		expect(images).toHaveLength(2);

		const button = screen.getByRole('button', { name: /load more posts/i });
		expect(button).toBeInTheDocument();
	});

	it('should search for posts', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não foram encontrados nenhum post');

		expect.assertions(10);

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);

		expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

		await userEvent.type(search, 'title1');
		expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Search Value: title1' })).toBeInTheDocument();

		userEvent.clear(search);
		expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title2' })).toBeInTheDocument();

		await userEvent.type(search, 'post does not exist');
		expect(screen.getByText('Não foram encontrados nenhum post')).toBeInTheDocument();
	});

	it('should load more posts when button is clicked', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não foram encontrados nenhum post');

		// expect.assertions(10);

		await waitForElementToBeRemoved(noMorePosts);

		const button = screen.getByRole('button', { name: /load more posts/i });

		await userEvent.click(button);

		expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
		expect(button).toBeDisabled();
	});
});
