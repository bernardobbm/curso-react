import { PostType } from '../../pages/Home';
import { PostCart } from '../PostCart';
import './style.css';

interface PostTypeArray {
	posts: PostType[];
}

export function Posts({ posts }: PostTypeArray) {
	return (
		<div className="posts">
			{posts.map((post) => (
				<PostCart
					id={post.id}
					title={post.title}
					body={post.body}
					cover={post.cover}
					// post={post}
					key={post.id}
				/>
			))}
		</div>
	);
}
