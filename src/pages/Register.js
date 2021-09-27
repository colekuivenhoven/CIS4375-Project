// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Register.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function Register(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(window.sessionStorage.getItem('current_user'));

    // Regular varaible declaration
    const pageTitle = "Register"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        var mainContainer = document.querySelector(".container-register");
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
    function handleAddButtonLocal() {
        localNumberRaw += 1;
        setLocalNumber(localNumberRaw);
    }

    function handleAddButtonGlobal() {
        setGlobalNumber(parseInt(globalNumber)+1);
        window.sessionStorage.setItem("num_global", parseInt(globalNumber)+1);
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-register">
                {/* Variables can be inserted inside of brackets as shown below */}
                {/* <div className="register-window-container">
                    <div className="register-window-head">
                        <span className="register-title">register</span>
                    </div>
                    <div className="register-window-body">
                        <form className="register-form">
                            <div className="register-input-container">
                                <span className="register-input-label">Username: </span>
                                <input className="register-input"

                                />
                            </div>
                            <div className="register-input-container">
                                <span className="register-input-label">Password: </span>
                                <input className="register-input" type="password"

                                />
                            </div>
                            <div className="register-submit-button">
                                register
                            </div>
                        </form>
                    </div>
                </div> */}
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser}</b>!</div>}
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Register;