// All imports must be done before the main function
  // Importing main CSS file. This CSS file can be used in other pages without importing it in each file.
import './assets/styles/App.css';

  // Importing 'pages' that will be used
import Home from './pages/Home.js';
import AdminHome from './pages/AdminHome.js';
import Account from './pages/Account.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Reserve from './pages/Reserve.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Test from './pages/Test.js';

  // Importing the router files
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Importing common files used in react
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

// Root application function
function App() {
  const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);
  const [isMobile, setIsMobile] = useState(screenSize[0] < screenSize[1] ? true : false);
  const [currentUser, setCurrentUser] = useState(window.sessionStorage.getItem('current_user'));
  const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
      setIsMobile(window.innerWidth < window.innerHeight ? true : false);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    // Root 'Router' element for switching between pages. The return can have only one root element.
    <Router>
      <div>
        {!isMobile && <nav className="app-navigation-new" id="navbar">
          {/* Visible link elements to different pages */}
          <Link className="route-link-title" to="/">🎾 Homer Ford <div className="title-tint-text">Tennis Center</div></Link>
          <div className="new-menu-container">
            <Link className="new-route-link-menu" to="/">Home</Link>
            <Link className="new-route-link-menu" to="/about">About</Link>
            <Link className="new-route-link-menu" to="/contact">Contact</Link>
            <Link className="new-route-link-menu" to="/account">Account</Link>
            <Link className="new-route-link-menu" to="/reserve">Reserve</Link>
            <Link className="new-route-link-menu" to="/test">Debug</Link>
            {loggedIn && 
              <div className="new-route-link-menu-2"
                onClick={() => {
                  window.sessionStorage.removeItem('current_user');
                  window.location.reload();
                }}
              >
                Logout
              </div>
            }
            {!loggedIn && 
              <Link className="new-route-link-menu-2" to="/login">Login</Link>
            }
          </div>
        </nav>}

        {isMobile && <div>Mobile Navigation Bar</div>}

        {/* Route path definitions */}
        <Switch>
          <Route path="/admin">
            <AdminHome isMobile={isMobile} />
          </Route>
          <Route path="/account">
            <Account isMobile={isMobile} />
          </Route>
          <Route path="/about">
            <About isMobile={isMobile} />
          </Route>
          <Route path="/contact">
            <Contact isMobile={isMobile} />
          </Route>
          <Route path="/reserve">
            <Reserve isMobile={isMobile} />
          </Route>
          <Route path="/login">
            <Login isMobile={isMobile} />
          </Route>
          <Route path="/register">
            <Register isMobile={isMobile} currentUser={currentUser} />
          </Route>
          <Route path="/test">
            <Test isMobile={isMobile} currentUser={currentUser} />
          </Route>
          <Route path="/">
            <Home isMobile={isMobile} currentUser={currentUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default App;
