// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin2.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";

// Variables declared that will persist even if page is changed
var gotLogs = false;
var logArray = [];
var selectedLog = [];

// Main function for the specific 'page'
function Admin(props) {
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [selectedFilename, setSelectedFilename] = useState('');
    const [loglistFinal, setLoglistFinal] = useState([]);

    // Regular varaible declaration
    const pageTitle = "Admin 2"
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        if(!gotLogs) {
            getLogs();
        }

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

        return () => {
            gotLogs = false;
            resetSelected();
        }
    }, []);

    // Server functions
    async function getLogs() {
        let response = await fetch("http://3.218.225.62:3040/logs/getall");
        response = await response.json();
        logArray = response.files;

        gotLogs = true;
        renderLogs();
    }

    async function getLogfile(name) {
        let response = await fetch("http://3.218.225.62:3040/logs/get/"+name);
        // response = await response.json(); 
        selectedLog = await response.text();

        renderOneLog();
    }

    // Render functions
    function renderLogs() {
        var logBuffer = [];

        logArray.forEach((log, index) => {
            logBuffer.push(
                <div className="container-log-item" key={index}
                    onClick={() => {
                        setSelectedFilename(log);
                        getLogfile(log);
                    }}
                >
                    {log}
                </div>
            )
        })

        setLoglistFinal(logBuffer);
    }

    function renderOneLog() {
        var fileBuffer = selectedLog.split("\n");
        var finalBuffer = [];
        // console.log(selectedLog)

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

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-admin2">
                <div className="container-admin2-content">
                    <div className="container-admin2-content-item-reservations">
                        <div className="container-admin2-content-item-title">Reservations</div>
                        <div className="container-admin2-content-item-body">

                        </div>
                    </div>
                    <div className="container-admin2-content-item-users">
                        <div className="container-admin2-content-item-title">Users</div>
                        <div className="container-admin2-content-item-body">
                            
                        </div>
                    </div>
                    <div className="container-admin2-content-item-logs">
                        <span className="container-admin2-content-item-title">{selectedFilename != "" ? selectedFilename : "Logs"}</span>
                        <div className="container-admin2-content-item-body-log" id="log-scroller">
                            {loglistFinal}
                        </div>
                    </div>
                    <div className="container-admin2-content-item-reports">
                        <div className="container-admin2-content-item-title">Reports</div>
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