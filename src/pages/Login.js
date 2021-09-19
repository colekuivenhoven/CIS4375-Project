// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Login.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

// Main function for the specific 'page'
function Login(props) {
    // 'Reactive' variables that will cause the page to update when their values change
        // 'useState' at the end of each describes their initial value
    const [localNumber, setLocalNumber] = useState(localNumberRaw)
        // The initial value below uses a conditional operator which means: 
            // if (condition) then (value) else (other_value)
            // Turns into...
            // (condition) ? (value) : (other_value)
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0)

    // Regular varaible declaration
    const pageTitle = "Login"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        var mainContainer = document.querySelector(".container-login");
        var fontLarge = document.querySelectorAll(".font-round-large");
        var fontMed = document.querySelectorAll(".font-round-medium");
        var addButton = document.querySelectorAll(".container-add");

        if(isMobile) {
            mainContainer.style.top = "0vmin"

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
            mainContainer.style.top = "0vmin"
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
            <div className="container-login">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="login-window-container">
                    <div className="login-window-head">
                        <span className="font-round-medium">Login</span>
                        <span className="register-text">Don't have an account? 
                            <a href="/register" className="register-link">Register Here</a>
                        </span>
                    </div>
                    <div className="login-window-body">
                        <form className="login-form">
                            <div className="login-input-container">
                                <span className="login-input-label">Username: </span>
                                <input className="login-input"

                                />
                            </div>
                            <div className="login-input-container">
                                <span className="login-input-label">Password: </span>
                                <input className="login-input" type="password"

                                />
                            </div>
                            <div className="login-submit-button">
                                Login
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Login;