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

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
      setIsMobile(window.innerWidth < window.innerHeight ? true : false);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // handle functions
  function handleMenuButton() {
    // document.querySelector(".menu-modal").classList.toggle("active");
    // document.querySelector(".menu-modal-window").classList.toggle("active");

    // if(isMobile){
    //   var modalWindow = document.querySelector(".menu-modal-window");
    //   var modalWindowHead = document.querySelector(".menu-modal-window-head");
    //   var modalWindowBody = document.querySelector(".menu-modal-window-body");
    //   var modalClose = document.querySelector(".menu-modal-close");
    //   var routeLinks = document.querySelectorAll(".route-link-menu");
    //   var menuLabels = document.querySelectorAll(".menu-group-label")

    //   modalWindowHead.style.height = "13vmin";
    //   modalWindowBody.style.top = "13vmin";
    //   modalClose.style.height = "13vmin";

    //   routeLinks.forEach(link => {
    //     link.style.height = "13vmin";
    //     link.style.fontSize = "5vmin";
    //   });

    //   menuLabels.forEach(link => {
    //     link.style.fontSize = "4vmin";
    //     link.style.marginTop = "2vmin";
    //   });

    //   if(modalWindow.classList.contains("active")) {
    //     modalWindow.style.width = "85vmin";
    //   }
    //   else {
    //     modalWindow.style.width = "0vmin";
    //   }
    // }
  }

  return (
    // Root 'Router' element for switching between pages. The return can have only one root element.
    <Router>
      
      <div>

        {!isMobile && <nav className="app-navigation-new" id="navbar">
          {/* Visible link elements to different pages */}
          {/* <Link className="route-link-logo" to="/">🎾 Homer Ford Tennis Center</Link> */}
          <Link className="route-link-title" to="/">🎾 Homer Ford <div className="title-tint-text">Tennis Center</div></Link>
          {/* <div 
            className="menu-button"
            onClick={() => {
              handleMenuButton();
            }}
          ></div> */}
          <div className="new-menu-container">
            <Link className="new-route-link-menu" to="/" onClick={() => {handleMenuButton()}}>Home</Link>
            <Link className="new-route-link-menu" to="/about" onClick={() => {handleMenuButton()}}>About</Link>
            <Link className="new-route-link-menu" to="/contact" onClick={() => {handleMenuButton()}}>Contact</Link>
            <Link className="new-route-link-menu" to="/account" onClick={() => {handleMenuButton()}}>Account</Link>
            <Link className="new-route-link-menu" to="/reserve" onClick={() => {handleMenuButton()}}>Reserve</Link>
            <Link className="new-route-link-menu-2" to="/login" onClick={() => {handleMenuButton()}}>Login</Link>
          </div>
        </nav>}

        {isMobile && <nav className="app-navigation-mobile" id="navbar">
          {/* Visible link elements to different pages */}
          <Link className="route-link-logo-mobile" to="/">🎾 Homer Ford Tennis Center</Link>
          <div 
            className="menu-button"
            onClick={() => {
              handleMenuButton();
            }}
          ></div>
        </nav>}

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
            <Register isMobile={isMobile} />
          </Route>
          <Route path="/test">
            <Test isMobile={isMobile} />
          </Route>
          <Route path="/">
            <Home isMobile={isMobile} />
          </Route>
        </Switch>
      </div>

      {/* <div className="menu-modal">
        <div className="modal-toggle-area" onClick={() => {handleMenuButton()}}></div>
        <div className="menu-modal-window">
          <div className="menu-modal-window-head">
            <div 
              className="menu-modal-close"
              onClick={() => {
                handleMenuButton();
              }}
            ></div>
          </div>
          <div className="menu-modal-window-body">
            <Link className="route-link-menu" to="/" onClick={() => {handleMenuButton()}}>🏡 Home</Link>
            <Link className="route-link-menu" to="/about" onClick={() => {handleMenuButton()}}>❓ About</Link>
            <Link className="route-link-menu" to="/contact" onClick={() => {handleMenuButton()}}>📞 Contact</Link>
            <span className="menu-group-label">Account</span>
            <Link className="route-link-menu" to="/account" onClick={() => {handleMenuButton()}}>🧑 My Account</Link>
            <Link className="route-link-menu" to="/reserve" onClick={() => {handleMenuButton()}}>📒 Reserve a Court</Link>
            <Link className="route-link-menu" to="/login" onClick={() => {handleMenuButton()}}>🔐 Login/Register</Link>
            <span className="menu-group-label">Administration</span>
            <Link className="route-link-menu" to="/admin" onClick={() => {handleMenuButton()}}>📊 Admin Portal</Link>
            <span className="menu-group-label">Debug</span>
            <Link className="route-link-menu" to="/test" onClick={() => {handleMenuButton()}}>⚙️ Test Page</Link>
          </div>
        </div>
      </div> */}

    </Router>
  );
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default App;
