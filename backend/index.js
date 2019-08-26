const express = require('express')
const posts = require('./posts.json')
const commentsFile = require('./comments.json')

const server = express();

// enable CORS (Cross-Origin Resource Sharin)
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Security-Policy", "*");
    next();
  });
  

server.use(express.static('public'))

server.get('/getPosts', (req,res) => {
    res.send(posts)
})

server.get('/getComments/:postId', (req,res) => {
    let postId = req.params.postId;
    let commentSent = false
    const commentsArray = commentsFile.commentsArray
    for (let i = 0; i < commentsArray.length; i++) {
        let postComment = commentsArray[i];
        if (postComment["postId"] == postId) {
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.send(postComment["postComments"])
            commentSent = true
            break
        }
    }
    if (!commentSent) {
        res.send("No comment")
    }
})

server.listen(4000, () => {
    console.log('Backend is running on http://localhost:4000')
})