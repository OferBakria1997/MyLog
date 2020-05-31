import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Login from "./components/login.component"
import Register from "./components/register.component"
import AboutMe from "./components/aboutme.component"
import Settings from "./components/settings.component"


function App() {
  return (
    <Router>
      <div className="container" >
    <Navbar />
      <br/>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register}/>
        <Route path="/aboutme" exact component={AboutMe}/>
        <Route path="/settings" exact component={Settings}/>
      </div>
    </Router>
  );
}

export default App;
