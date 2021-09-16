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
import Test from './pages/Test.js';

  // Importing the router files
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Root application function
function App() {

  // handle functions
  function handleMenuButton() {
    document.querySelector(".menu-modal").classList.toggle("active");
    document.querySelector(".menu-modal-window").classList.toggle("active");
  }

  return (
    // Root 'Router' element for switching between pages. The return can have only one root element.
    <Router>
      <div>
        <nav className="app-navigation" id="navbar">
          {/* Visible link elements to different pages */}
          <Link className="route-link-logo" to="/">🎾 Homer Ford Tennis Center</Link>
          <div 
            className="menu-button"
            onClick={() => {
              handleMenuButton();
            }}
          >

          </div>
        </nav>

        {/* Route path definitions */}
        <Switch>
          <Route path="/admin">
            <AdminHome />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/reserve">
            <Reserve />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <div className="menu-modal">
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
            {/* Visible link elements to different pages */}
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
      </div>
    </Router>
  );
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default App;
