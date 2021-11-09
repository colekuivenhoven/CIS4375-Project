// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Test.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import bcrypt from "bcryptjs";

// Imorting the components used in this page
import AlertMessage from '../components/AlertMessage';

var testDataRaw = [];
var testDataConverted = [];
var gotTestData = false;

// Main function for the specific 'page'
function Test(props) {
    const [alertMessage, setAlertMessage] = useState({
        msg: "",
        type: ""
    });
    const [testData, setTestData] = useState([]);
    const [testFirstname, setTestFirstname] = useState('');
    const [testLastname, setTestLastname] = useState('');
    const [testPassword, setTestPassword] = useState('');
    const [testPhone, setTestPhone] = useState('');
    const [testEmail, setTestEmail] = useState('');
    const [testType, setTestType] = useState('0');
    const [testStatus, setTestStatus] = useState('1');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [testGetAnnouncements, setTestGetAnnouncements] = useState('0');

    const[guessMatched, setGuessMatched] = useState('false');

    // Regular varaible declaration
    const pageTitle = ""
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotTestData) {
            getTestData();
        }

        return () => {
            gotTestData = false;
        }
    }, []);

    // Get data functions
    async function getTestData() {
        let response = await fetch("http://3.218.225.62:3040/user/getall");
        response = await response.json();
        testDataRaw = response[Object.keys(response)[1]].reverse();
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
                    <div className="test-user-item" style={{width: "35%"}}>{user.User_id}</div>
                    <div className="test-user-item" style={{width: "50%"}}>{user.User_type == 0 ? 'Customer' : user.User_type == 1 ? 'Employee' : 'Manager'}</div>
                    <div className="test-user-item" style={{width: "70%"}}>{user.User_firstname}</div>
                    <div className="test-user-item" style={{width: "100%"}}>{user.User_lastname}</div>
                    <div className="test-user-item" style={{width: "70%"}}>{user.User_phone}</div>
                    <div className="test-user-item" >{user.User_email}</div>
                    <div className="test-user-item" style={{width: "70%"}}>{user.User_getAnnouncements == 0 ? 'False' : 'True'}</div>
                    <div className="test-user-item" style={{width: "30%"}}>{user.User_status == 0 ? 'Inactive' : user.User_status == 1 ? "Active" : "Other"}</div>
                </div>
            )
        });

        setTestData(testDataConverted);
        gotTestData = true;
        resetSelected();
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
        .then(response => {
            if(response.message.includes("Success")) {
                gotTestData = false;
                getTestData();
                resetSelected();
                sendAlertMessage("Successfully Added User!", "Good");
            }
            else {
                sendAlertMessage(response.message, "Bad");
            }
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
        .then(() => {
            gotTestData = false;
            getTestData();
        })
    }

    // Handling functions
    function handleSubmit() {
        var data = {
            firstname: testFirstname,
            lastname: testLastname,
            password: testPassword,
            phone: testPhone,
            email: testEmail,
            type: testType,
            status: testStatus,
            getannouncements: testGetAnnouncements
        }

        if(data.firstname == '' || data.lastname == '' || data.password == '' || data.phone == '' || data.email == '') {
            sendAlertMessage("One of the required fields is blank!", "Bad");
        }
        else {
            addUser(data)
        }
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

    function resetSelected() {
        setTestFirstname('');
        setTestLastname('');
        setTestPassword('');
        setTestPhone('');
        setTestEmail('');
        setTestType('0');
        setTestGetAnnouncements('0');
        setTestStatus('1');
    }

    function handleDelete(userid) {
        var data = {
            id: userid
        }

        deleteUser(data);
        setSelectedUser(null);
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
                        <div className="test-object-header-item" style={{width: "35%"}}>
                            ID
                        </div>
                        <div className="test-object-header-item" style={{width: "50%"}}>
                            Type
                        </div>
                        <div className="test-object-header-item" style={{width: "70%"}}>
                            First Name
                        </div>
                        <div className="test-object-header-item" style={{width: "100%"}}>
                            Last Name
                        </div>
                        <div className="test-object-header-item" style={{width: "70%"}}>
                            Phone #
                        </div>
                        <div className="test-object-header-item">
                            Email
                        </div>
                        <div className="test-object-header-item" style={{width: "70%"}}>
                            Announceable
                        </div>
                        <div className="test-object-header-item" style={{width: "30%"}}>
                            Status
                        </div>
                    </div>
                    <div className="test-object-container">
                        
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', transition: 'all 0.25s linear'}}>{testData}</div>
                    </div>
                    <div className="test-add-container">
                        <b style={{color: 'rgb(255, 214, 110)', marginLeft: 'auto', fontSize: '2vmin', marginBottom: '1vmin'}}>Add User</b>
                        <span className="test-add-text">
                            Firstname: <input className="test-add-input" value={testFirstname} onChange={(e) => {setTestFirstname(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Lastname: <input className="test-add-input" value={testLastname} onChange={(e) => {setTestLastname(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Password: <input className="test-add-input" value={testPassword} onChange={(e) => {setTestPassword(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Phone: <input className="test-add-input" value={testPhone} onChange={(e) => {setTestPhone(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Email: <input className="test-add-input" value={testEmail} onChange={(e) => {setTestEmail(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Type: 
                            <select className="test-add-select" value={testType} onChange={(e) => {setTestType(e.target.value)}}>
                                <option value="0">Customer</option>
                                <option value="1">Employee</option>
                                <option value="2">Administrator</option>
                            </select>
                        </span>
                        <span className="test-add-text">
                            Announceable: 
                            <select className="test-add-select" value={testGetAnnouncements} onChange={(e) => {setTestGetAnnouncements(e.target.value)}}>
                                <option value="0">False</option>
                                <option value="1">True</option>
                            </select>
                        </span>
                        <span className="test-add-text">
                            Status: 
                            <select className="test-add-select" value={testStatus} onChange={(e) => {setTestStatus(e.target.value)}}>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </span>
                        <button className="test-add-button" onClick={() => {handleSubmit()}}>+ Add</button>
                    </div>
                </div>
                <div className="test-object-info-container">
                    {selectedUser != null && 
                        <>
                            <div className="user-detail-container">
                                <div className="user-detail-item" style={{height: "20%"}}>
                                    ID: 
                                    <span style={{opacity: "60%", marginLeft: "0.5vmin"}}>{selectedUser.User_id}</span>
                                </div>
                                <div className="user-detail-item" style={{height: "20%"}}>
                                    Type: 
                                    <span style={{opacity: "60%", marginLeft: "0.5vmin"}}>{selectedUser.User_type == 0 ? 'Customer' : selectedUser.User_type == 1 ? 'Employee' : 'Manager'}</span>
                                </div>
                                <div className="user-detail-item" style={{height: "20%"}}>
                                    Announceable: 
                                    <span style={{opacity: "60%", marginLeft: "0.5vmin"}}>{selectedUser.User_getAnnouncements == 0 ? 'False' : 'True'}</span>
                                </div>
                                <div className="user-detail-item">
                                    First Name: <br/>
                                    <span style={{opacity: "60%"}}>{selectedUser.User_firstname}</span>
                                </div>
                                <div className="user-detail-item">
                                    Last Name: <br/>
                                    <span style={{opacity: "60%"}}>{selectedUser.User_lastname}</span>
                                </div>
                                <div className="user-detail-item">
                                    Password: <br/>
                                    <span style={{opacity: "60%", fontSize: "1vmin"}}>{selectedUser.User_password}</span>
                                </div>
                                <div className="user-detail-item">
                                    Phone #: <br/>
                                    <span style={{opacity: "60%"}}>{selectedUser.User_phone}</span>
                                </div>
                                <div className="user-detail-item">
                                    Email: <br/>
                                    <span style={{opacity: "60%"}}>{selectedUser.User_email}</span>
                                </div>
                                <div className="user-detail-item">
                                    Status: <br/>
                                    <span style={{opacity: "60%"}}>{selectedUser.User_status == 0 ? 'Inactive' : selectedUser.User_status == 1 ? 'Active' : 'Unverified'}</span>
                                </div>
                                {/* <div className="test-password-compare-container">Password Guess: 
                                    <input className="test-password-guess-input"
                                        onChange={e => {
                                            passwordGuess(e.target.value, selectedUser.User_password);
                                        }}
                                    />
                                    <span> Match? {guessMatched}</span>
                                </div> */}
                            </div>
                            <div 
                                className="info-edit"
                                onClick={() => {
                                    
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
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
                <AlertMessage alertMessage={alertMessage}/>
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Test;