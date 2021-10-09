// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Login.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Importing the router files
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
    const [globalNumber, setGlobalNumber] = useState(window.sessionStorage.getItem("num_global") ? window.sessionStorage.getItem("num_global") : 0);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));

    const [guessUsername, setGuessUsername] = useState('');
    const [guessPassword, setGuessPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

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
    function handleLogin(username, password) {
        var data = {
            username: username,
            password: password
        }

        if(data.username == '' || data.password == '') {
            setLoginResponse(`You've entered blank data!`);
            return;
        }

        fetch("http://3.218.225.62:3040/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setLoginResponse(response.message);

            if(response.message == 'Login Successful!') {
                setGuessUsername('');
                setGuessPassword('');
                window.sessionStorage.setItem('current_user', JSON.stringify(response.user));
                window.location.href = "/";
            }
            else {
                setGuessPassword('');
            }
        })
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-login">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="login-window-container active">
                    <Link className="login-back-button" to="/"><div className="login-back-button-image"></div></Link>
                    <div className="login-window-head">
                        <span className="login-title">Login</span>
                        <span className="register-text">Don't have an account? 
                            <span className="register-link" 
                                onClick={() => {
                                    document.querySelector('.login-window-container').classList.toggle('active');
                                    document.querySelector('.register-window-container').classList.toggle('active');
                                    document.querySelector('.register-window-container').style.animation = "login-window-animation 0.4s ease-in-out";
                                }}
                            >
                                Register Now
                            </span>
                        </span>
                    </div>
                    <div className="login-window-body">
                        <form className="login-form">
                            <div className="login-input-container">
                                <span className="login-input-label">Username: </span>
                                <input className="login-input" value={guessUsername}
                                    onChange={e => {
                                        setGuessUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="login-input-container">
                                <span className="login-input-label">Password: </span>
                                <input className="login-input" value={guessPassword}
                                    onChange={e => {
                                        setGuessPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="login-submit-button"
                                onClick={() => {
                                    handleLogin(guessUsername,guessPassword);
                                }}
                            >
                                Login
                            </div>
                        </form>
                    </div>
                    <div className="login-response-container">{loginResponse}</div>
                </div>

                <div className="register-window-container ">
                    <Link className="login-back-button" to="/"><div className="login-back-button-image"></div></Link>
                    <div className="register-window-head">
                        <span className="register-title">Register</span>
                        <span className="register-text">Already have any account?
                            <span className="register-link" 
                                onClick={() => {
                                    document.querySelector('.login-window-container').classList.toggle('active');
                                    document.querySelector('.register-window-container').classList.toggle('active');
                                    document.querySelector('.register-window-container').style.animation = "login-window-animation-reverse 0.4s ease-in-out";
                                }}
                            >
                                Login
                            </span>
                        </span>
                    </div>
                    <div className="register-window-body">
                        <form className="register-form">
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Email: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Valid email. Maximum of 50 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Phone: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Format with dashes(ex: 123-456-7890). Maximum 12 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Username: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Only letters and numbers. Minimum 6 characters. Maximum 15 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Password: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container" style={{ fontSize: '1vmin'}}>Must contain at least one of each: Special character, number, uppercase letter, lowercase letter. Minimum 8 characters. Maximum 20 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label" style={{ fontSize: '2vmin' }}>Confirm&nbsp;Password: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Must match the password entered above.</div>
                            </div>
                            <div className="register-submit-button" style={{height: '5vmin'}}
                                onClick={() => {
                                    
                                }}
                            >
                                Register
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