// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin2.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated, useTrail, config } from 'react-spring';
import Charts from '../components/Charts';

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

    // Test data
        // bar chart
        const barData = [
            {user: 1, duration: 510},
            {user: 2, duration: 458},
            {user: 3, duration: 427},
            {user: 4, duration: 315},
            {user: 5, duration: 260},
            {user: 6, duration: 231},
            {user: 7, duration: 96},
        ];

        // line chart
        const lineData = [
            {month: 1, revenue: 13000},
            {month: 2, revenue: 16500},
            {month: 3, revenue: 14250},
            {month: 4, revenue: 15100},
            {month: 5, revenue: 15950},
            {month: 6, revenue: 15375},
            {month: 7, revenue: 17690},
            {month: 8, revenue: 16250},
            {month: 9, revenue: 13125},
            {month: 10, revenue: 12250},
            {month: 11, revenue: 14900},
            {month: 12, revenue: 15400},
        ];

        // pie chart
        const pieData = [
            {x: "#1", y: 105},
            {x: "#2", y: 89},
            {x: "#3", y: 67},
            {x: "#4", y: 44},
            {x: "#5", y: 49},
            {x: "#6", y: 27},
            {x: "#7", y: 21},
            {x: "#8", y: 111},
            {x: "#9", y: 61},
            {x: "#10", y: 59},
            {x: "#11", y: 22},
            {x: "#12", y: 31},
            {x: "#13", y: 32},
            {x: "#14", y: 24},
            {x: "#15", y: 31},
            {x: "#16", y: 20},
        ];

    // Regular varaible declaration
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
                        <div className="container-admin2-content-item-body-report">
                            <div className="container-report-item">
                                {/* Pie Chart - Number of Reservations for each Court over the Past Month */}
                                <span className="admin2-chart-title">Total Reservations by Court <br/> (1 month)</span>
                                <Charts chartData={pieData} chartType={"pie"}/>
                            </div>
                            <div className="container-report-item">
                                {/* Line Graph - Total number of reservations each month over the last year */}
                                <span className="admin2-chart-title">Total Revenue by Month <br/> (1 year)</span>
                                <Charts chartData={lineData} chartType={"line"}/>
                            </div>
                            <div className="container-report-item">
                                {/* Bar Chart - Top 10 users by cumulative reservation duration over the last month */}
                                <span className="admin2-chart-title">Cumulative Reservation Duration by User (1 month)</span>
                                <Charts chartData={barData} chartType={"bar"}/>
                            </div>
                            <div className="container-report-item-more">
                                See all data reports
                            </div>
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
                                        // style={{
                                        //     transform: userItemStyle.x
                                        //         .to({
                                        //             range: [0,2],
                                        //             output: [0, (Math.pow(index, 1.1)+1)]
                                        //         })
                                        //         .to((x) => `translateX(${x}vmin)`),
                                        //     opacity: userItemStyle.x
                                        //         .to({
                                        //             range: [0,2],
                                        //             output: [1, 0]
                                        //         })
                                        // }}
                                        //rgba(0,0,0,0.5);
                                        style={{
                                            color: (user[Object.keys(user)[1]] == 2) 
                                            ? "rgba(50, 168, 82,0.9)" 
                                            : (user[Object.keys(user)[1]] == 1) 
                                                ? "rgba(36, 101, 181,0.7)" 
                                                : "rgba(0,0,0,0.5)",
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
                            : "Server Logs"}
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
                        <div className="container-admin2-content-item-title">Reservation System Manager</div>
                        <div className="container-admin2-content-item-body-reservation">
                            <div className="container-admin2-reservation-item"
                                onClick={() => {
                                    window.location.href = "/reserveadmin";
                                }}
                            >
                                <div className="container-admin2-reservation-button">
                                    <div className="container-admin2-reservation-button-img"></div>Launch App
                                </div>
                            </div>
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