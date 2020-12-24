import React from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditPost from "./Components/edit_post";
import Home from "./Components/index";
import Login from "./Components/login";
import Logout from "./Components/logout";
import Navbar from "./Components/navbar";
import Post from "./Components/post";
import Register from "./Components/register";
import Write from "./Components/write_post";

const App = () => (
    <Router>
        <Route exact path = "*" component = {Navbar} />
        <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path = "/login" component = {Login} />
            <Route path = "/register" component = {Register} />
            <Route path = "/logout" component = {Logout} />
            <Route path = "/create" component = {Write} />
            <Route path = "/post/:postId/edit" component = {EditPost} />
            <Route path = "/post/:postId" component = {Post} />
        </Switch>
    </Router>
)

export default App;