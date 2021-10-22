// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin2.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated, useTrail, config } from 'react-spring';

// Log variables
var gotLogs = false;
var logArray = [];
var selectedLog = [];

// Main function for the specific 'page'
function Admin(props) {
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [selectedFilename, setSelectedFilename] = useState('');
    const [loglistFinal, setLoglistFinal] = useState([]);
    const [userListFinal, setUserListFinal] = useState([]);
    const [userListSort, setUserListSort] = useState('asc');
    const [userListSortType, setUserListSortType] = useState(0);

    const [userItemStyle, setUserItemStyle] = useSpring(() => ({ x: 2 }))

    // Regular varaible declaration
    const pageTitle = "Admin 2"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotLogs) {
            getLogs();
        }
        getUsers();
        setUserItemStyle({ 
            to: {x: 0},
            from: {x: 2},
            config: config.stiff
        })

        var mainContainer = document.querySelector(".container-admin2");
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
    }, [userListSortType, userListSort]);

    // Server functions
    async function getLogs() {
        let response = await fetch("http://3.218.225.62:3040/logs/getall");
        response = await response.json();
        setLoglistFinal(response.files);
    }

    async function getUsers() {
        let response = await fetch("http://3.218.225.62:3040/customer/getall");
        response = await response.json();
        setUserListFinal(response.customers);
    }

    async function getLogfile(name) {
        setLoglistFinal("Loading...");
        let response = await fetch("http://3.218.225.62:3040/logs/get/"+name);
        // response = await response.json(); 
        selectedLog = await response.text();

        renderOneLog();
    }

    function renderOneLog() {
        var fileBuffer = selectedLog.split("\n");
        var finalBuffer = [];

        fileBuffer.forEach((line,index) => {
            finalBuffer.push(
                <div key={index} className="container-log-item-line">
                    {line}
                </div>
            )
        })

        setLoglistFinal(finalBuffer);
        scrollToBottom('log-scroller');
    }

    // Handling functions
    function resetSelected() {
        setSelectedFilename('');
        setLoglistFinal([]);
    }

    // Borrowed from: https://stackoverflow.com/a/33193668/17127255
    function scrollToBottom(id) {
        var element = document.getElementById(id);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    
    function handleButtonSort() {
        if(userListSort == "desc") {
            setUserListSort("asc");
        }
        else {
            setUserListSort("desc");
        }
        document.querySelector(".admin2-btn-sort").classList.toggle("desc");
    }

    // Sorting functions
    function sortObjectList(list, keyID, AscOrDesc) {
        /* Current supports ASC or DESC sort with numbers or strings */
        let keyValue = list[Object.keys(list)[0]];
        let keyValueType = typeof keyValue;

        if(keyValueType !== 'undefined') {
            keyValue = keyValue[Object.keys(keyValue)[keyID]]
            keyValueType = typeof keyValue;

            if(keyValueType === 'string') {
                if(AscOrDesc == "asc") {
                    return [...list].sort((a,b) => (a[Object.keys(a)[keyID]]).localeCompare(b[Object.keys(b)[keyID]]));
                }
                else if(AscOrDesc == "desc") {
                    return [...list].sort((a,b) => (b[Object.keys(b)[keyID]]).localeCompare(a[Object.keys(a)[keyID]]));
                }
                else {
                    return ["Error"];
                }
            }
            else {
                if(AscOrDesc == "asc") {
                    return [...list].sort((a,b) => a[Object.keys(a)[keyID]] - b[Object.keys(b)[keyID]]);
                }
                else if(AscOrDesc == "desc") {
                    return [...list].sort((a,b) => b[Object.keys(b)[keyID]] - a[Object.keys(a)[keyID]]);
                }
                else {
                    return ["Error"];
                }
            }
        }
        else {
            return["Loading"]
        }
    }

    return (
        <>
            <div className="container-admin2">
                <div className="container-admin2-content">
                    <div className="container-admin2-content-item-reservations">
                        <div className="container-admin2-content-item-title">Data Reports</div>
                        <div className="container-admin2-content-item-body">

                        </div>
                    </div>
                    <div className="container-admin2-content-item-users">
                        <div className="container-admin2-content-item-title">
                            Users
                            <select className="admin2-btn-sort-type"
                                style={{marginLeft: 'auto'}}
                                onChange={(e) => {
                                    setUserListSortType(e.target.value);
                                }}
                            >
                                <option value={0}>ID</option>
                                <option value={4}>Name</option>
                                <option value={1}>Type</option>
                            </select>
                            <div className="admin2-btn-sort"
                                onClick={() => {
                                    handleButtonSort();
                                }}
                            >{userListSort}</div>
                        </div>
                        <div className="container-admin2-content-item-body-user">
                            {sortObjectList(userListFinal, userListSortType, userListSort).map((user,index) => {
                                return (
                                    <animated.div key={index} className="container-user-item"
                                        style={{
                                            transform: userItemStyle.x
                                                .to({
                                                    range: [0,2],
                                                    output: [0, 4*(index+1)]
                                                })
                                                .to((x) => `translateX(${x}vmin)`),
                                            opacity: userItemStyle.x
                                                .to({
                                                    range: [0,2],
                                                    output: [1, 0]
                                                })
                                        }}
                                    >
                                        {user[Object.keys(user)[0]]} - {user[Object.keys(user)[4]]} ({user[Object.keys(user)[2]]})
                                    </animated.div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="container-admin2-content-item-logs">
                        <span className="container-admin2-content-item-title">
                            {selectedFilename != "" 
                            ? <>
                                <div className="admin2-btn-back"
                                    onClick={() => {
                                        resetSelected();
                                        getLogs();
                                    }}
                                ></div>
                                <div>{selectedFilename}</div>
                            </> 
                            : "Logs"}
                        </span>
                        <div className="container-admin2-content-item-body-log" id="log-scroller">
                            {loglistFinal.map((log, index) => {
                                return (
                                    <div className="container-log-item" key={index}
                                        onClick={() => {
                                            // setSelectedFilename(log);
                                            // getLogfile(log);
                                        }}
                                    >
                                        {log}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="container-admin2-content-item-reports">
                        <div className="container-admin2-content-item-title">Reservation Calendar</div>
                        <div className="container-admin2-content-item-body">
                            
                        </div>
                    </div>
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_name}</b>!</div>}
            </div>
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Admin;