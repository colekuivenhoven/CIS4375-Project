// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Test.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import bcrypt from "bcryptjs";

// Variables declared that will persist even if page is changed
var localNumberRaw = 0;

var testDataRaw = [];
var testDataConverted = [];
var gotTestData = false;

// Main function for the specific 'page'
function Test(props) {
    const[testData, setTestData] = useState([]);
    const[testUsername, setTestUsername] = useState('');
    const[testPassword, setTestPassword] = useState('');
    const[testPhone, setTestPhone] = useState('');
    const[testEmail, setTestEmail] = useState('');
    const[selectedUser, setSelectedUser] = useState(null);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(window.sessionStorage.getItem('current_user'));

    const[guessMatched, setGuessMatched] = useState('false');

    // Regular varaible declaration
    const pageTitle = ""
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotTestData) {
            getTestData();
        }

        var mainContainer = document.querySelector(".container-test");
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

        return () => {
            gotTestData = false;
        }
    }, []);

    // Get data functions
    async function getTestData() {
        let response = await fetch("http://3.218.225.62:3040/users/getall");
        response = await response.json();
        testDataRaw = response.users.reverse();
        testDataConverted = [];

        if (!gotTestData) {
            convertTestData();
        }
    }

    function convertTestData() {
        testDataRaw.forEach((user,index) => {
            testDataConverted.push(
                <div 
                    key={index} 
                    className="test-user-container"
                    onClick={() =>{
                        setSelectedUser(user)
                    }}
                >
                    <div className="test-user-item">{user.User_id}</div>
                    <div className="test-user-item">{user.User_type == 0 ? 'Customer' : 'Employee'}</div>
                    <div className="test-user-item">{user.User_name}</div>
                    <div className="test-user-item">{user.User_phone}</div>
                    <div className="test-user-item">{user.User_email}</div>
                    <div className="test-user-item">{user.User_getAnnouncements == 0 ? 'False' : 'True'}</div>
                </div>
            )
        });

        setTestData(testDataConverted);
        gotTestData = true;
    }

    function addUser(data) {
        fetch("http://3.218.225.62:3040/user/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => {
            gotTestData = false;
            getTestData();
        })
    }

    function deleteUser(data) {
        fetch("http://3.218.225.62:3040/user/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => {
            gotTestData = false;
            getTestData();
        })
    }

    // Handling functions
    function handleSubmit() {
        var data = {
            username: testUsername,
            password: testPassword,
            phone: testPhone,
            email: testEmail
        }

        if(data.username == '' || data.password == '' || data.phone == '' || data.email == '') {
            console.log("Empty Field!")
        }
        else {
            addUser(data);
        }

        setTestUsername('');
        setTestPassword('');
        setTestPhone('');
        setTestEmail('');
    }

    function handleDelete(userid) {
        var data = {
            id: userid
        }

        deleteUser(data);
        setSelectedUser(null);
    }

    function handleEdit() {
        
    }

    function passwordGuess(guess, hashedAnswer) {
        if (bcrypt.compareSync(guess, hashedAnswer)) {
            setGuessMatched('true');
        }
        else {
            setGuessMatched('false');
        }
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-test">
                {/* Variables can be inserted inside of brackets as shown below */}
                <div className="page-title"><span className="font-round-large">{pageTitle}</span></div>
                <div className="test-form-container">
                    <div className="test-object-header">
                        <div className="test-object-header-item">
                            ID
                        </div>
                        <div className="test-object-header-item">
                            Type
                        </div>
                        <div className="test-object-header-item">
                            Username
                        </div>
                        <div className="test-object-header-item">
                            Phone #
                        </div>
                        <div className="test-object-header-item">
                            Email
                        </div>
                        <div className="test-object-header-item">
                            Announceable
                        </div>
                    </div>
                    <div className="test-object-container">
                        
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', transition: 'all 0.25s linear'}}>{testData}</div>
                    </div>
                    <div className="test-add-container">
                        <b style={{color: 'rgb(255, 214, 110)', marginLeft: 'auto', fontSize: '2vmin', marginBottom: '1vmin'}}>Add User</b>
                        <span className="test-add-text">Username: <input className="test-add-input" value={testUsername} onChange={(e) => {setTestUsername(e.target.value)}}/></span>
                        <span className="test-add-text">Password: <input className="test-add-input" value={testPassword} onChange={(e) => {setTestPassword(e.target.value)}}/></span>
                        <span className="test-add-text">Phone: <input className="test-add-input" value={testPhone} onChange={(e) => {setTestPhone(e.target.value)}}/></span>
                        <span className="test-add-text">Email: <input className="test-add-input" value={testEmail} onChange={(e) => {setTestEmail(e.target.value)}}/></span>
                        <button className="test-add-button" onClick={() => {handleSubmit()}}>+ Add</button>
                    </div>
                </div>
                <div className="test-object-info-container">
                    {selectedUser != null && 
                        <>
                            <div>
                                <div>ID: {selectedUser.User_id}</div>
                                <div>Type: {selectedUser.User_type}</div>
                                <div>Username: {selectedUser.User_name}</div>
                                <div>Password: {selectedUser.User_password}</div>
                                <div>Phone #: {selectedUser.User_phone}</div>
                                <div>Email: {selectedUser.User_email}</div>
                                <div>Announceable: {selectedUser.User_getAnnouncements}</div>
                                <div className="test-password-compare-container">Password Guess: 
                                    <input className="test-password-guess-input"
                                        onChange={e => {
                                            passwordGuess(e.target.value, selectedUser.User_password);
                                        }}
                                    />
                                    <span> Match? {guessMatched}</span>
                                </div>
                            </div>
                            <div 
                                className="info-edit"
                                onClick={() => {
                                    handleEdit();
                                }}
                            >
                                📝
                            </div>
                            <div 
                                className="info-delete"
                                onClick={() => {
                                    handleDelete(selectedUser.User_id);
                                }}
                            >
                                🗑️
                            </div>
                        </>
                    }
                    {selectedUser == null && 
                        <div>
                            No user selected
                        </div>
                    }
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser}</b>!</div>}
            </div>
            <div className="test-modal">
                
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Test;