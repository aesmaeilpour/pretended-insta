import React from "react"
import { Link } from "react-router-dom"
import { apiServer } from "./Home"

const getCommentsEndpoint = apiServer + "getComments/"


export class Comment extends React.Component {

    render() {
        return (
            <div>{this.props.userName}
                {this.props.comment}
            </div>
        )
    }
}

export class CommentsPage extends React.Component {


    constructor() {
        super();
        this.state = {
            comments: null
        };
    }

    componentWillMount() {
        this.fetchComments()
    }

    fetchComments() {
        fetch(getCommentsEndpoint + this.props.match.params.postId)
            .then(response => {
                console.log("response: ")
                return response.json()
            })
            .then(responseJson => {
                console.log("response: ", responseJson)
                this.setState({ comments: responseJson })
                let commentsArr = JSON.stringify(this.state.comments);
                console.log("commentsArr.lenth: ",commentsArr.lenth)
            }
            )
            .catch((error) => {
                console.error("Error occured when calling getComments endpoint", error)
            })

    }


    render() {
        let commentsArr = this.state.comments;
        //console.log("commentsArr.lenth: ",commentsArr.lenth)
        /*.map(comment  {
            console.log(comment.userName)
            console.log(comment.text)
            //return comment
        })*/
        
        return (
            <div>
                <Link to="/">Home</Link>
                <div>Comments</div>
                <h3>Comments of post: {this.props.match.params.postId}</h3>
                {this.state.comments &&
                    this.state.comments.map(postComment => {
                        return <Comment
                            userName={postComment.userName}
                            comment={postComment.comment}
                            />
                    })
                }
            </div>
        )

    }

};