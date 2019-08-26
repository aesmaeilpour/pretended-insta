import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./Home"
import {CommentsPage} from "./CommentsPage"


const App = () => {
    
        return (
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/comments/:postId" component={CommentsPage} />
            </Router>
        );
}

export default App;
