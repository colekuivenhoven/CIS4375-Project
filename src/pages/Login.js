// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Login.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import validator from 'validator';

// Imorting the components used in this page
import AlertMessage from '../components/AlertMessage';

// Importing the router files
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// Main function for the specific 'page'
function Login(props) {
    const [alertMessage, setAlertMessage] = useState({
        msg: "",
        type: ""
    });
    const [guessEmail, setGuessEmail] = useState('');
    const [guessPassword, setGuessPassword] = useState('');
    const registerForm = useRef(null);

    // Regular varaible declaration
    var isMobile = props.isMobile;

    // Handling functions
    function handleLogin(email, password) {
        var data = {
            email: email,
            password: password
        }

        if(data.email == '' || data.password == '') {
            sendAlertMessage("You've entered blank data!", "Bad");
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
            sendAlertMessage(response.message, "Bad");

            if(response.message == 'Login Successful!') {
                let responseObj = response[Object.keys(response)[1]];
                setGuessEmail('');
                setGuessPassword('');

                if(responseObj.User_status != 2) {
                    let convertedResponse = {
                        User_id: responseObj.User_id,
                        User_type: responseObj.User_type,
                        User_email: responseObj.User_email,
                        User_phone: responseObj.User_phone,
                        User_firstname: responseObj.User_firstname,
                        User_lastname: responseObj.User_lastname,
                        User_getAnnouncements: responseObj.User_getAnnouncements,
                        User_status: responseObj.User_status,
                    }
                    window.sessionStorage.setItem('current_user', JSON.stringify(convertedResponse));
                    window.location.href = "/";
                }
                else {
                    sendAlertMessage("Please verify your account through the email we sent in order to login!", "Bad");
                }
            }
            else {
                setGuessPassword('');
            }
        })
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        let formdata = {
            email: e.target[0].value,
            phone: e.target[1].value,
            firstname: e.target[2].value,
            lastname: e.target[3].value,
            password1: e.target[4].value,
            password2: e.target[5].value,
            announcements: e.target[6].value == "on" ? '1' : '0',
        }

        let validationTest = Object.values(formdata).map((value, index) => {
            if(value == '') {
                sendAlertMessage("You've entered blank data!", "Bad");
                return false;
            }

            // Email validation
            if(index == 0) {
                if(!validator.isEmail(value)) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Phone validation
            if(index == 1) {
                let regex = /^\d{3}-\d{3}-\d{4}$/;
                if(value.match(regex) == null) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Firstname validation
            if(index == 2) {
                let regex = /^[a-zA-Z]{1,50}$/;
                if(value.match(regex) == null) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Lastname validation
            if(index == 3) {
                let regex = /^[a-zA-Z]{1,50}$/;
                if(value.match(regex) == null) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Password 1 validation
            if(index == 4) {
                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
                if(value.match(regex) == null) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Password 2 validation
            if(index == 5) {
                if(value != formdata.password1) {
                    e.target[index].style.border = "3px solid rgba(255,0,0,0.4)";
                    e.target[index].style.color = "rgba(255,0,0,0.4)";

                    return false;
                }
                e.target[index].style.border = "3px solid #80DB8F";
                e.target[index].style.color = "#80DB8F";
                return true;
            }

            // Announcement validation
            if(index == 6) {
                return true;
            }
        });
        
        if(!validationTest.includes(false)) {
            let fullData = {
                firstname: formdata.firstname,
                lastname: formdata.lastname,
                password: formdata.password2,
                phone: formdata.phone,
                email: formdata.email,
                type: '0',
                status: '2',
                getannouncements: formdata.announcements
            }

            fetch("http://3.218.225.62:3040/user/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullData)
            })
            .then(response => response.json())
            .then(response => {
                if(response.message.includes("Success")) {
                    // Passed Validation
                    sendAlertMessage("Account Created! Please verify your account by selecting the link we sent to your email.", "Good");

                    document.querySelector('.login-window-container').classList.toggle('active');
                    document.querySelector('.register-window-container').classList.toggle('active');
                    document.querySelector('.register-window-container').style.animation = "login-window-animation-reverse 0.4s ease-in-out";
                    clearForm(e, formdata);

                    sendVerifcationEmail(formdata.email);
                }
                else {
                    // Failed Validation
                    sendAlertMessage(response.message, "Bad");
                }
            })
        }
        else {
            sendAlertMessage("Failed Validation! Please correct the field(s) highlighted!", "Bad");
        }
    }

    async function sendVerifcationEmail(email) {
        let response = await fetch("http://3.218.225.62:3040/email/send-verification/"+email);
        console.log(response);
    }

    function clearForm(e, formdata) {
        Object.values(formdata).map((value, index) => {
            if(index == 0) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }

            if(index == 1) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }

            if(index == 2) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }

            if(index == 3) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }

            if(index == 4) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }

            if(index == 5) {
                e.target[index].style.border = "0px solid rgba(255,0,0,0.4)";
                e.target[index].style.color = "rgba(0,0,0,0.5)";
                e.target[index].value = "";
            }
        });
    }

    function sendAlertMessage(message, type) {
        setAlertMessage({
            msg: "",
            type: ""
        });
        setAlertMessage({
            msg: message,
            type: type
        });
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
                                <span className="login-input-label">Email: </span>
                                <input className="login-input" value={guessEmail}
                                    onChange={e => {
                                        setGuessEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="login-input-container">
                                <span className="login-input-label">Password: </span>
                                <input type="password" className="login-input" value={guessPassword}
                                    onChange={e => {
                                        setGuessPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="login-submit-button"
                                onClick={() => {
                                    handleLogin(guessEmail,guessPassword);
                                }}
                            >
                                Login
                            </div>
                        </form>
                    </div>
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
                        <form 
                            className="register-form" 
                            ref={registerForm} 
                            onSubmit={e => handleRegisterSubmit(e)}
                        >
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
                                <span className="register-input-label">First&nbsp;Name: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Only letters. Maximum 50 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Last&nbsp;Name: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Only letters. Maximum 50 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label">Password: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container" style={{ fontSize: '1vmin'}}>At least one: special character, number, uppercase letter, and lowercase letter. Minimum 8 characters. Maximum 20 characters.</div>
                            </div>
                            <div className="register-input-container" style={{height: '5vmin'}}>
                                <span className="register-input-label" style={{ fontSize: '1.5vmin' }}>Confirm&nbsp;Password: </span>
                                <input className="register-input"

                                />
                                <div className="register-input-tip-container">Must match the password entered above.</div>
                            </div>
                            <div className="register-getannouncements-checkbox-container">
                                <input type="checkbox" className="register-getannouncements-checkbox" defaultChecked={false} />
                                <span className="register-input-label" style={{ fontSize: '1.5vmin' }}>Receive Announcements?</span>
                            </div>
                            <button className="register-submit-button" style={{height: '5vmin', marginBottom: '1vmin', border: "none"}}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
                <div className="login-response-container"><AlertMessage alertMessage={alertMessage}/></div>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Login;