import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';

import { server } from '../../mocks/server';

import { Home } from '.';

describe('<Home />', () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it('should render search, post and load more', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não foram encontrados nenhum post');

		await waitForElementToBeRemoved(noMorePosts);

		screen.debug();
	});
});
