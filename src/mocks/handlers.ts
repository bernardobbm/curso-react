import { rest } from 'msw';

export const handlers = [
	rest.get('https://jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
		return res(
			ctx.json([
				{
					userId: 1,
					id: 1,
					title: 'title1',
					body: 'body1',
					url: 'img1.jpg',
				},
				{
					userId: 2,
					id: 2,
					title: 'title2',
					body: 'body2',
					url: 'img2.jpg',
				},
				{
					userId: 3,
					id: 3,
					title: 'title3',
					body: 'body3',
					url: 'img3.jpg',
				},
			])
		);
	}),
];
