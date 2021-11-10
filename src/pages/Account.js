// All imports must be done before the main function
    // Importing this page's CSS file
import '../assets/styles/Account.css';

// Importing common files used in react
import React, { useEffect, useRef, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

// Importing the components used in this page
import Loading from '../components/Loading';

// Main function for the specific 'page'
function Account(props) {
    const [loggedIn, setLogginIn] = useState(window.sessionStorage.getItem('current_user') ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.sessionStorage.getItem('current_user')));
    const [userReservations, setUserReservations] = useState([]);

    // Regular varaible declaration
    var isMobile = props.isMobile;

    // 'useEffect' runs once for every render of the page
    useEffect(() => {
        getUserReservations();
    },[]);

    // Handling functions
    let firstName = currentUser.User_firstname;
    let lastName = sessionStorage.getItem('lastName')
    let phone = sessionStorage.getItem('phone')
    let email = sessionStorage.getItem('email')

    async function getUserReservations() {
        let response = await fetch("http://3.218.225.62:3040/reservation/get-user/"+currentUser.User_id);
        response = await response.json();
        setUserReservations(response.reservations);
    }

    return (
        // Empty root element. The return can have only one root element
        <>
            <div className="container-account">
                <div className="account-content-container">
                    <div className="account-row">
                        <div className="account-info-container">
                            <div className="account-info-item" style={{opacity: '100%', fontSize: '4.25vmin'}}>
                                {currentUser.User_firstname} {currentUser.User_lastname}
                            </div>
                            <div className="account-info-item" style={{opacity: '65%', fontSize: '2.5vmin', marginLeft: '5vmin'}}>
                                {currentUser.User_email}
                            </div>
                            <div className="account-info-item" style={{opacity: '65%', fontSize: '2.5vmin', marginLeft: '5vmin'}}>
                                {currentUser.User_phone}
                            </div>
                            <div className="account-info-item" style={{opacity: '65%', fontSize: '2.5vmin', marginLeft: '5vmin'}}>
                                {currentUser.User_type == 2 ? "Administrator" : currentUser.User_type == 1 ? "Employee" : "Customer"}
                            </div>
                            <div className="account-info-item" style={{opacity: '65%', fontSize: '2.5vmin', marginLeft: '5vmin'}}>
                                {currentUser.User_status == 1 ? "Verified" : currentUser.User_status == 0 ? "Inactive" : "Pending"}
                            </div>
                            <div className="account-info-item" style={{marginLeft: '4vmin', marginTop: "auto"}}>
                                <span className="account-password-reset-btn active" style={{width: "25vmin"}}>Change Password</span>
                                <span className={`account-password-reset-btn ${currentUser.User_getAnnouncements == 1 ? "active" : ""}`}
                                    style={{
                                        backgroundColor: "rgba(245, 158, 66, 0.8)",
                                    }}
                                >
                                    Alerts: {currentUser.User_getAnnouncements == 0 ? "Off" : "On"}
                                </span>
                            </div>
                        </div>
                        <div className="account-img" />
                    </div>
                    <div className="account-column-title">Reservation History</div>
                    <div className="account-column">
                        {userReservations.map((res, index) => {
                            return (
                                <Link to="/reserve" className="account-column-item" key={index}>
                                    <span>{res.Reservation_date}</span>
                                    <span>{res.Reservation_duration} hour(s)</span>
                                    <span>{res.Reservation_people} {res.Reservation_people == 1 ? "person" : "people"}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {loggedIn && <div className="user-welcome">Welcome back, <b style={{marginLeft: '0.5vmin'}}>{currentUser.User_firstname}</b>!</div>}
            </div>
            <Loading timeRange={[250, 500]} />
        </>
    )
}

// Function must be 'exposed' to rest of the application at the end of the file as shown below.
export default Account;