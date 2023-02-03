import { useCallback, useEffect, useState } from 'react';

import './style.css';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export interface PostType {
	id: number;
	title: string;
	body: string;
	cover: string;
}

export function Home() {
	const [posts, setPosts] = useState<PostType[]>([]);
	const [allPosts, setAllPosts] = useState<PostType[]>([]);
	const [page, setPage] = useState(0);
	const [postsPerPage] = useState(2);
	const [searchValue, setSearchValue] = useState('');

	const noMorePosts = page + postsPerPage >= allPosts.length;

	const filteredPosts = !!searchValue
		? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
		: posts;

	const loadPostsInPage = useCallback(async (page: number, postsPerPage: number) => {
		const postsAndPhotos = await loadPosts();

		setPosts(postsAndPhotos.slice(page, postsPerPage));
		setAllPosts(postsAndPhotos);
	}, []);

	useEffect(() => {
		loadPostsInPage(0, postsPerPage);
	}, [loadPostsInPage, postsPerPage]);

	function loadMorePosts() {
		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

		posts.push(...nextPosts);

		setPosts(posts);
		setPage(nextPage);
	}

	function handleInputChange(e: any) {
		const { value } = e.target;

		setSearchValue(value);
	}

	return (
		<section className="container">
			<div className="search-container">
				{!!searchValue && <h1>Search Value: {searchValue}</h1>}

				<TextInput
					searchValue={searchValue}
					handleInputChange={handleInputChange}
				/>
			</div>

			{filteredPosts.length > 0 ? (
				<Posts posts={filteredPosts} />
			) : (
				<p>Não foram encontrados nenhum post</p>
			)}

			<div className="button-container">
				{!searchValue && (
					<Button
						text="Load more posts"
						onClick={loadMorePosts}
						disabled={noMorePosts}
					/>
				)}
			</div>
		</section>
	);
}
