import React from "react";
import { Link } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";

export const apiServer = "http://localhost:4000/"
const imageServer = apiServer + "images/"
const getPostsEndpoint = apiServer + "getPosts/"

class Home extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			posts: null
		};
	}

	componentWillMount() {
		this.fetchPosts();
	}

	fetchPosts() {
		fetch(getPostsEndpoint)
			.then(response => response.json())
			.then(responseJson => this.setState({ posts: responseJson.postsArray }))
			.catch((error) => {
				console.error("Error occured when calling getPosts endpoint", error)
			})
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<div>
					{this.state.posts ?
						this.state.posts.map((post) => {
							console.log("CommentCount: " + post.commentsCount)
							return <Post
								postId={post.postId}
								userName={post.username}
								postImage={post.image}
								caption={post.caption}
								commentsCount={post.commentsCount}
							/>
						}) : <span>No posts found</span>
					}
				</div>
			</div>

		);
	}
}

class Post extends React.Component {

	render() {
		let numberOfComments = 0;
		numberOfComments = parseInt(this.props.commentsCount);
		let commentsLabel;
		if (numberOfComments > 0) {
			commentsLabel = this.props.commentsCount + " COMMENTS ";
		} else {
			commentsLabel = "NO COMMENTS.";
		}

		return (
			<div className="post">
				<div >
					<img alt="this.props.caption" className="post-image" src={imageServer + this.props.postImage}></img>
				</div>
				<div className="user-name">{this.props.userName}</div>
				<div className="caption">{this.props.caption}</div>
				<div className="comments-count">{commentsLabel}
					{numberOfComments > 0 &&
						<Link to={"/comments/" + this.props.postId}>(CLICK TO SHOW)</Link>
					}
				</div>

			</div>
		);
	}
}




export default Home