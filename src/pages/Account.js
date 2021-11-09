// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Account.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Importing the components used in this page
import Loading from '../components/Loading';

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function Account(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));

    // Regular varaible declaration
    const pageTitle = "My Account"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        var mainContainer = document.querySelector(".container-account");
        var fontLarge = document.querySelectorAll(".font-round-large");
        var fontMed = document.querySelectorAll(".font-round-medium");
        var addButton = document.querySelectorAll(".container-add");

        if(isMobile) {
            mainContainer.style.top = "15vmin"

            fontLarge.forEach(el => {
                el.style.fontSize = "10vmin"
            });

            fontMed.forEach(el => {
                el.style.fontSize = "5.5vmin"
            });

            addButton.forEach(el => {
                el.style.width = "5.5vmin"
                el.style.marginLeft = "3vmin"
            });
        }
        else {
            mainContainer.style.top = "7vmin"
            fontLarge.forEach(el => {
                el.style.fontSize = "4vmin"
            });

            fontMed.forEach(el => {
                el.style.fontSize = "2.25vmin"
            });

            addButton.forEach(el => {
                el.style.width = "2.5vmin"
                el.style.marginLeft = "1vmin"
            });
        }
    });

    // Handling functions
    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }

    let firstName = currentUser.User_firstname;
    let lastName = sessionStorage.getItem('lastName')
    let phone = sessionStorage.getItem('phone')
    let email = sessionStorage.getItem('email')

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-account">
                {/* Variables can be inserted inside of brackets as shown below */}
                {/* <div className="page-title"><span className="font-round-large">{pageTitle}</span></div> */}
                <div className="test-container">
                <div class="main-text-panel">
                    <span>
                
                    <div class="main-text-body">
                       
                        <p>First Name: {currentUser.User_firstname}</p>
                        <p>Last Name: {currentUser.User_lastname}</p>
                        <p>Phone Number: {currentUser.User_phone}</p>
                        <p>Email: {currentUser.User_email}</p>
                    </div>
                    </span>
                    </div>
                    
                </div>
                <div className="test-container">
                    
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
            </div>
            <Loading timeRange={[250, 500]} />
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Account;