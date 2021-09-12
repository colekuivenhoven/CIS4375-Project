// All imports must be done before the main function
  // Importing main CSS file. This CSS file can be used in other pages without importing it in each file.
import './assets/styles/App.css';

  // Importing 'pages' that will be used
import Home from './pages/Home.js';
import AdminHome from './pages/AdminHome.js';
import Account from './pages/Account.js';

  // Importing the router files
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Root application function
function App() {
  return (
    // Root 'Router' element for switching between pages. The return can have only one root element.
    <Router>
      <div>
        <nav className="app-navigation" id="navbar">
          {/* Visible link elements to different pages */}
          <Link className="route-link" to="/">Home</Link>
          <Link className="route-link" to="/account">Account</Link>
          <Link className="route-link" to="/admin">Admin</Link>
        </nav>

        {/* Route path definitions */}
        <Switch>
          <Route path="/admin">
            <AdminHome />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default App;
