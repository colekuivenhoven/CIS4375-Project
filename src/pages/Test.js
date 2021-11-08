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
    const [editing, setEditing] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const [guessMatched, setGuessMatched] = useState('false');

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

    function selectItem(index) {
        if(index) {
            document.querySelectorAll(".test-user-container").forEach((val, idx) => {
                if (val.id == `detailed-user-item-`+index) {
                    val.setAttribute("style", "border: 0.2vmin solid rgba(66, 135, 245, 0.9);")
                }
                else {
                    val.setAttribute("style", "border: ")
                }
            })
        }
        else {
            document.querySelectorAll(".test-user-container").forEach((val, idx) => {
                val.setAttribute("style", "border: ")
            })
        }
    }

    function convertTestData() {
        testDataRaw.forEach((user,index) => {
            testDataConverted.push(
                <div 
                    key={index}
                    id={`detailed-user-item-`+index} 
                    className={`test-user-container`}
                    onClick={() =>{
                        setSelectedUser(user);
                        resetSelected();
                        selectItem(index);
                        handleEdit(user);
                    }}
                >
                    <div className="test-user-item" style={{width: "35%"}}>{user.User_id}</div>
                    <div className="test-user-item" style={{width: "50%"}}>{user.User_type == 0 ? 'Customer' : user.User_type == 1 ? 'Employee' : 'Manager'}</div>
                    <div className="test-user-item" style={{width: "50%"}}>{user.User_firstname}</div>
                    <div className="test-user-item" style={{width: "50%"}}>{user.User_lastname}</div>
                    <div className="test-user-item" style={{width: "50%"}}>{user.User_phone}</div>
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

    function editUser(data) {
        fetch("http://3.218.225.62:3040/user/edit", {
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
                handleCancel();
                sendAlertMessage("Successfully Edited User!", "Good");
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

    function handleEdit(user) {
        setEditing(true);
        setTestFirstname(user.User_firstname);
        setTestLastname(user.User_lastname);
        setTestPhone(user.User_phone);
        setTestEmail(user.User_email);
        setTestType(user.User_type);
        setTestGetAnnouncements(user.User_getAnnouncements);
        setTestStatus(user.User_status);
    }

    function handleUserUpdate(includesPassword) {
        if (includesPassword) {
            var data = {
                firstname: testFirstname,
                lastname: testLastname,
                phone: testPhone,
                email: testEmail,
                type: testType,
                status: testStatus,
                password: testPassword,
                id: selectedUser.User_id
            }
    
            if(data.firstname == '' || data.lastname == '' || data.phone == '' || data.email == '' || data.password == '') {
                sendAlertMessage("One of the required fields is blank!", "Bad");
            }
            else {
                editUser(data)
            }
        }
        else {
            var data = {
                firstname: testFirstname,
                lastname: testLastname,
                phone: testPhone,
                email: testEmail,
                type: testType,
                status: testStatus,
                id: selectedUser.User_id
            }
    
            if(data.firstname == '' || data.lastname == '' || data.phone == '' || data.email == '') {
                sendAlertMessage("One of the required fields is blank!", "Bad");
            }
            else {
                editUser(data)
            }
        }
    }

    function handleCancel() {
        resetSelected();
        setSelectedUser(null);
        setEditing(false);
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
        setEditing(false);
        selectItem(null);
        setDeleteConfirm(false);
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
                        <div className="test-object-header-item" style={{width: "50%"}}>
                            First Name
                        </div>
                        <div className="test-object-header-item" style={{width: "50%"}}>
                            Last Name
                        </div>
                        <div className="test-object-header-item" style={{width: "50%"}}>
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
                        <b style={{color: !editing ? 'rgb(255, 214, 110)' : 'rgba(66, 135, 245, 0.7)', marginLeft: 'auto', fontSize: '2vmin', marginBottom: '1vmin'}}>{editing ? "Update User" : "Add User"}</b>
                        <span className="test-add-text">
                            Firstname: <input className="test-add-input" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testFirstname} onChange={(e) => {setTestFirstname(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Lastname: <input className="test-add-input" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testLastname} onChange={(e) => {setTestLastname(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Password: 
                            {!editing && <input className="test-add-input" 
                                style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} 
                                value={testPassword} 
                                onChange={(e) => {setTestPassword(e.target.value)}}
                            />}
                            {editing && <input className="test-add-input" 
                                style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} 
                                value={testPassword} 
                                placeholder="Leave blank to keep current"
                                onChange={(e) => {setTestPassword(e.target.value)}}
                            />}
                        </span>
                        <span className="test-add-text">
                            Phone: <input className="test-add-input" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testPhone} onChange={(e) => {setTestPhone(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Email: <input className="test-add-input" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testEmail} onChange={(e) => {setTestEmail(e.target.value)}}/>
                        </span>
                        <span className="test-add-text">
                            Type: 
                            <select className="test-add-select" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testType} onChange={(e) => {setTestType(e.target.value)}}>
                                <option value="0">Customer</option>
                                <option value="1">Employee</option>
                                <option value="2">Administrator</option>
                            </select>
                        </span>
                        <span className="test-add-text">
                            Announceable: 
                            <select className="test-add-select" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testGetAnnouncements} onChange={(e) => {setTestGetAnnouncements(e.target.value)}}>
                                <option value="0">False</option>
                                <option value="1">True</option>
                            </select>
                        </span>
                        <span className="test-add-text">
                            Status: 
                            <select className="test-add-select" style={editing ? {color : 'rgba(66, 135, 245, 0.7)'} : {}} value={testStatus} onChange={(e) => {setTestStatus(e.target.value)}}>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                                <option value="2">Unverified</option>
                            </select>
                        </span>
                        <button 
                            className="test-add-button" 
                            style={editing ? {backgroundColor: 'rgba(66, 135, 245, 0.7)'} : {}}
                            onClick={() => {
                                if(!editing) {
                                    handleSubmit() 
                                }
                                else {
                                    if(testPassword.length == 0) {
                                        handleUserUpdate(null)
                                    }
                                    else {
                                        handleUserUpdate(testPassword)
                                    }
                                }
                            }}
                        >
                            {editing ? "Update" : "+ Add"}
                        </button>
                        {editing && <div className="test-cancel-btn"
                            onClick={() => {
                                handleCancel();
                            }}
                        >
                            Cancel
                        </div>}
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
                                <div className="user-detail-item"
                                    style={{
                                        overflow: 'hidden'
                                    }}
                                >
                                    Password: <br/>
                                    <span 
                                        style={{
                                            opacity: "40%", 
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {(selectedUser.User_password).substring(0, 20)+"..."}
                                    </span>
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
                                className={`info-delete ${deleteConfirm ? "selected" : ""}`}
                                onClick={() => {
                                    // handleDelete(selectedUser.User_id);
                                    setDeleteConfirm(true);
                                }}
                            >
                                {!deleteConfirm ? "Delete" : ""}
                                {deleteConfirm && <>
                                    <div
                                        style={{
                                            fontSize: ".9vmin",
                                            marginBottom: "1vmin",
                                            opacity: "75%"
                                        }}
                                    >
                                        Are you sure you want to delete this user?
                                    </div>
                                    <div className="delete-confirm-btn"
                                        style={{
                                            marginRight: "0.5vmin"
                                        }}
                                        onClick={() => {
                                            handleDelete(selectedUser.User_id);
                                        }}
                                    >
                                        Delete
                                    </div>
                                    <div className="delete-confirm-btn"
                                        style={{
                                            marginLeft: "0.5vmin",
                                            color: "rgba(0, 0, 0, 0.5)"
                                        }}
                                        onClick={() => {
                                            setDeleteConfirm(false);
                                            handleCancel();
                                        }}
                                    >
                                        Cancel
                                    </div>
                                </>}
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