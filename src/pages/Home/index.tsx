import { Component } from 'react';

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
interface StateType {
	posts: PostType[];
	allPosts: PostType[];
	page: number;
	postsPerPage: number;
	searchValue: string;
}

export class Home extends Component {
	state: StateType = {
		posts: [],
		allPosts: [],
		page: 0,
		postsPerPage: 2,
		searchValue: '',
	};

	// lifecycle methods
	// componentDidUpdate() {}
	// componentWillUnmount() {}
	async componentDidMount() {
		const { page, postsPerPage } = this.state;

		const postsAndPhotos = await loadPosts();
		this.setState({
			posts: postsAndPhotos.slice(page, postsPerPage),
			allPosts: postsAndPhotos,
		});
	}

	loadMorePosts = () => {
		const { page, postsPerPage, allPosts, posts } = this.state;

		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

		posts.push(...nextPosts);

		this.setState({ posts, page: nextPage });
	};

	handleInputChange = (e: any) => {
		const { value } = e.target;

		this.setState({ searchValue: value });
	};

	/**
	 * render sempre sera chamado novamente quando o state mudar
	 * e tudo que depende dele será alterado
	 */
	render() {
		const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
		const noMorePosts = page + postsPerPage >= allPosts.length;

		const filteredPosts = !!searchValue
			? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
			: posts;

		return (
			<section className="container">
				<div className="search-container">
					{!!searchValue && <h1>Search Value: {searchValue}</h1>}

					<TextInput
						searchValue={searchValue}
						handleInputChange={this.handleInputChange}
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
							onClick={this.loadMorePosts}
							disabled={noMorePosts}
						/>
					)}
				</div>
			</section>
		);
	}
}
