import { PostType } from '../../pages/Home';
import './style.css';

export function PostCart({ title, body, cover }: PostType) {
	return (
		<div className="post">
			<img
				src={cover}
				alt={title}
			></img>

			<div className="post-content">
				<h2>{title}</h2>
				<p>{body}</p>
			</div>
		</div>
	);
}
