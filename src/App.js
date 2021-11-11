// All imports must be done before the main function
  // Importing main CSS file. This CSS file can be used in other pages without importing it in each file.
  import './assets/styles/App.css';

  // Importing 'pages' that will be used
import Home from './pages/Home.js';
// import AdminHome from './pages/AdminHome.js';
import Admin from './pages/Admin.js';
import Account from './pages/Account.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Reserve from './pages/Reserve.js';
import ReserveCustomer from './pages/ReserveCustomer.js';
import ReserveAdmin from './pages/ReserveAdmin.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Test from './pages/Test.js';
import Practice from './pages/Practice.js';
import Reports from './pages/Reports.js';

  // Importing the router files
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import socketIOClient from "socket.io-client";

// Importing common files used in react
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

const socket_ip = "http://3.218.225.62:4001";
const socket = socketIOClient(socket_ip);

// Root application function
function App() {
  const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);
  const [isMobile, setIsMobile] = useState(screenSize[0] < screenSize[1] ? true : false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
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

  if(loggedIn) {
    socket.on(`logout-user-${currentUser.User_id}`, () => {
      window.sessionStorage.removeItem('current_user');
      window.sessionStorage.removeItem('current_user_object');
      window.location.href = '/';
    });
  }

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
            {loggedIn && <Link className="new-route-link-menu" to="/account">Account</Link>}
            <Link className="new-route-link-menu" to={loggedIn ? "/reserve" : "/login"}>Reserve</Link>
            {(currentUser && currentUser.User_type == 2) && <Link className="new-route-link-menu" to="/admin">Admin</Link>}
            {loggedIn && 
              <div className="new-route-link-menu-2"
                onClick={() => {
                  window.sessionStorage.removeItem('current_user');
                  window.sessionStorage.removeItem('current_user_object');
                  window.location.href = '/';
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
          {/* <Route path="/admin-test">
            <AdminHome isMobile={isMobile} />
          </Route> */}
          <Route path="/admin">
            <Admin isMobile={isMobile} />
          </Route>
          <Route path="/reports">
            <Reports isMobile={isMobile} />
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
            <ReserveCustomer isMobile={isMobile} socket={socket}/>
          </Route>
          <Route path="/reserveadmin">
            <ReserveAdmin isMobile={isMobile} socket={socket}/>
          </Route>
          <Route path="/login">
            <Login isMobile={isMobile} />
          </Route>
          <Route path="/register">
            <Register isMobile={isMobile} currentUser={currentUser} />
          </Route>
          <Route path="/test/:id">
            <Test isMobile={isMobile} currentUser={currentUser} socket={socket}/>
          </Route>
          <Route path="/practice">
            <Practice isMobile={isMobile} currentUser={currentUser} />
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
