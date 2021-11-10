// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Admin2.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated, useTrail, config } from 'react-spring';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import Charts from '../components/Charts';

// Importing the components used in this page
import Loading from '../components/Loading';

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

    const [pieData, setPieData] = useState([{
        x: "1", y: 1
    }]);

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

    async function getPieData() {
        let query = `
            SELECT USER.User_id, COUNT(RESERVATION.Customer_id) AS total_reservations
            FROM USER
            JOIN RESERVATION ON USER.User_id = RESERVATION.Customer_id
            GROUP BY USER.User_id
            ORDER BY total_reservations DESC
            LIMIT 5
        `;
        let response = await fetch("http://3.218.225.62:3040/report/download", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({report_query: query})
        });
        response = await response.json();
        
        let converted_chart_data = response.report.map((data, idx) => {
            return {
                x: `ID: ${data.User_id}`,
                y: data.total_reservations
            }
        })

        setPieData(converted_chart_data);
    }

    // Regular varaible declaration
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        let isCancelled = false;

        if(!isCancelled) {
            if(!gotLogs) {
                getLogs();
            }
            getUsers();
            getPieData();
        }

        return () => { isCancelled = true };
    }, [userListSortType, userListSort]);

    // Server functions
    async function getLogs() {
        setLoglistFinal(["Loading..."]);
        let response = await fetch("http://3.218.225.62:3040/logs/getall");
        response = await response.json();
        setLoglistFinal(response.files);
    }

    async function getUsers() {
        let response = await fetch("http://3.218.225.62:3040/user/getall");
        response = await response.json();
        setUserListFinal(response.users);
    }

    async function getLogfile(name) {
        setLoglistFinal(["Loading..."]);
        let response = await fetch("http://3.218.225.62:3040/logs/get/"+name);
        // response = await response.json(); 
        selectedLog = await response.text();

        setLoglistFinal(selectedLog.split("\n"));
        scrollToBottom('log-scroller');
        //renderOneLog();
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
                                <span className="admin2-chart-title">Top 5 Users by Total Reservations</span>
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
                            <div className="container-report-item-more"
                                onClick={() => {
                                    window.location.href = "/reports";
                                }}
                            >
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
                                <option value={3}>Email</option>
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
                                    <Link key={index} className="container-user-item" to={"/test/"+user.User_id}
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
                                            color: (user.User_type == 2) 
                                            ? "rgba(50, 168, 82,0.9)" 
                                            : (user.User_type == 1) 
                                                ? "rgba(36, 101, 181,0.7)" 
                                                : "rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {user.User_id} - {user.User_email}
                                    </Link>
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
                            : "Feedback"}
                        </span>
                        <div className="container-admin2-content-item-body-log" id="log-scroller">
                            {loglistFinal.map((log, index) => {
                                return (
                                    <div 
                                        className="container-log-item" 
                                        key={index} 
                                        style={selectedFilename != "" ? {} : {fontSize: "1.25vmin", color: "rgba(0,0,0,0.3)"}}
                                        onClick={() => {
                                            if(selectedFilename == "") {
                                                setSelectedFilename(log);
                                                getLogfile(log);
                                            }
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
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
            </div>
            <Loading timeRange={[1000, 2000]} />
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Admin;