// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Practice.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Main function for the specific 'page'
function Practice(props) {
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));

    // Regular varaible declaration
    const pageTitle = "Practice Page"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        
    },[]);

    // Practice functions


    // Handling functions


    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-practice">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_name}</b>!</div>}
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Practice;