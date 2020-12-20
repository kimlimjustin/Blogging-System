import React from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./Components/index";
import Login from "./Components/login";
import Logout from "./Components/logout";
import Navbar from "./Components/navbar";
import Register from "./Components/register";

const App = () => (
    <Router>
        <Route exact path = "*" component = {Navbar} />
        <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path = "/login" component = {Login} />
            <Route path = "/register" component = {Register} />
            <Route path = "/logout" component = {Logout} />
        </Switch>
    </Router>
)

export default App;